from django.db.models import Sum, Avg, Count, F, FloatField, ExpressionWrapper
from django.db.models.functions import TruncDate
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.integrations.models import PlatformConnection
from .models import Campaign, CampaignMetric
from .serializers import CampaignSerializer, CampaignDetailSerializer, CampaignMetricSerializer
from .sync import sync_connection


class CampaignListView(generics.ListAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        qs = Campaign.objects.filter(
            connection__user=self.request.user,
            connection__is_active=True,
        ).select_related("connection").prefetch_related("metrics")

        platform = self.request.query_params.get("platform")
        if platform:
            qs = qs.filter(platform=platform)

        connection_id = self.request.query_params.get("connection_id")
        if connection_id:
            qs = qs.filter(connection_id=connection_id)

        return qs


class CampaignDetailView(generics.RetrieveAPIView):
    serializer_class = CampaignDetailSerializer

    def get_queryset(self):
        return Campaign.objects.filter(connection__user=self.request.user)


class SyncView(APIView):
    """Trigger a manual sync for a specific connection."""

    def post(self, request):
        connection_id = request.data.get("connection_id")
        date_from = request.data.get("date_from")
        date_to = request.data.get("date_to")

        if not all([connection_id, date_from, date_to]):
            return Response(
                {"error": "Informe connection_id, date_from e date_to."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            connection = PlatformConnection.objects.get(id=connection_id, user=request.user)
        except PlatformConnection.DoesNotExist:
            return Response({"error": "Conexão não encontrada."}, status=404)

        try:
            result = sync_connection(connection, date_from, date_to)
            return Response(result)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def kpi_summary(request):
    """
    Aggregate KPIs across all campaigns (or filtered).
    Query params: date_from, date_to, platform, connection_id
    """
    date_from = request.query_params.get("date_from")
    date_to = request.query_params.get("date_to")
    platform = request.query_params.get("platform")
    connection_id = request.query_params.get("connection_id")

    metrics_qs = CampaignMetric.objects.filter(
        campaign__connection__user=request.user,
        campaign__connection__is_active=True,
    )

    if date_from:
        metrics_qs = metrics_qs.filter(date_from__gte=date_from)
    if date_to:
        metrics_qs = metrics_qs.filter(date_to__lte=date_to)
    if platform:
        metrics_qs = metrics_qs.filter(campaign__platform=platform)
    if connection_id:
        metrics_qs = metrics_qs.filter(campaign__connection_id=connection_id)

    totals = metrics_qs.aggregate(
        total_spend=Sum("spend"),
        total_impressions=Sum("impressions"),
        total_clicks=Sum("clicks"),
        total_reach=Sum("reach"),
        total_leads=Sum("leads"),
        campaign_count=Count("campaign", distinct=True),
    )

    spend = float(totals["total_spend"] or 0)
    clicks = totals["total_clicks"] or 0
    impressions = totals["total_impressions"] or 0
    leads = totals["total_leads"] or 0

    return Response({
        "total_spend": spend,
        "total_impressions": impressions,
        "total_clicks": clicks,
        "total_reach": totals["total_reach"] or 0,
        "total_leads": leads,
        "campaign_count": totals["campaign_count"] or 0,
        "cpc": round(spend / clicks, 2) if clicks > 0 else 0,
        "cpm": round(spend / impressions * 1000, 2) if impressions > 0 else 0,
        "ctr": round(clicks / impressions * 100, 4) if impressions > 0 else 0,
        "cpl": round(spend / leads, 2) if leads > 0 else 0,
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def kpi_by_platform(request):
    """KPI breakdown grouped by platform."""
    date_from = request.query_params.get("date_from")
    date_to = request.query_params.get("date_to")

    metrics_qs = CampaignMetric.objects.filter(
        campaign__connection__user=request.user,
        campaign__connection__is_active=True,
    )
    if date_from:
        metrics_qs = metrics_qs.filter(date_from__gte=date_from)
    if date_to:
        metrics_qs = metrics_qs.filter(date_to__lte=date_to)

    rows = (
        metrics_qs
        .values("campaign__platform")
        .annotate(
            platform=F("campaign__platform"),
            total_spend=Sum("spend"),
            total_impressions=Sum("impressions"),
            total_clicks=Sum("clicks"),
            total_leads=Sum("leads"),
        )
        .order_by("campaign__platform")
    )

    result = []
    for row in rows:
        spend = float(row["total_spend"] or 0)
        clicks = row["total_clicks"] or 0
        impressions = row["total_impressions"] or 0
        leads = row["total_leads"] or 0
        result.append({
            "platform": row["platform"],
            "total_spend": spend,
            "total_impressions": impressions,
            "total_clicks": clicks,
            "total_leads": leads,
            "cpc": round(spend / clicks, 2) if clicks > 0 else 0,
            "ctr": round(clicks / impressions * 100, 4) if impressions > 0 else 0,
            "cpl": round(spend / leads, 2) if leads > 0 else 0,
        })

    return Response(result)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def metrics_timeseries(request):
    """
    Daily aggregated metrics for charts.
    Groups by date_from and optionally by platform.
    """
    date_from = request.query_params.get("date_from")
    date_to = request.query_params.get("date_to")
    platform = request.query_params.get("platform")
    group_by = request.query_params.get("group_by", "date")  # "date" or "platform"

    metrics_qs = CampaignMetric.objects.filter(
        campaign__connection__user=request.user,
        campaign__connection__is_active=True,
    )
    if date_from:
        metrics_qs = metrics_qs.filter(date_from__gte=date_from)
    if date_to:
        metrics_qs = metrics_qs.filter(date_to__lte=date_to)
    if platform:
        metrics_qs = metrics_qs.filter(campaign__platform=platform)

    if group_by == "platform":
        rows = (
            metrics_qs
            .values("date_from", "campaign__platform")
            .annotate(
                date=F("date_from"),
                platform=F("campaign__platform"),
                spend=Sum("spend"),
                impressions=Sum("impressions"),
                clicks=Sum("clicks"),
                leads=Sum("leads"),
            )
            .order_by("date_from", "campaign__platform")
        )
    else:
        rows = (
            metrics_qs
            .values("date_from")
            .annotate(
                date=F("date_from"),
                spend=Sum("spend"),
                impressions=Sum("impressions"),
                clicks=Sum("clicks"),
                leads=Sum("leads"),
            )
            .order_by("date_from")
        )

    return Response(list(rows))
