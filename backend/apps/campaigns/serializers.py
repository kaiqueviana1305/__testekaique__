from rest_framework import serializers
from .models import Campaign, CampaignMetric


class CampaignMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignMetric
        fields = [
            "id", "date_from", "date_to",
            "impressions", "clicks", "reach", "leads",
            "spend", "ctr", "cpc", "cpm", "cpl", "roas",
            "synced_at",
        ]


class CampaignSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source="get_platform_display", read_only=True)
    latest_metrics = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            "id", "platform", "platform_display", "external_id",
            "name", "status", "objective", "latest_metrics",
            "created_at", "updated_at",
        ]

    def get_latest_metrics(self, obj):
        metric = obj.metrics.first()
        if metric:
            return CampaignMetricSerializer(metric).data
        return None


class CampaignDetailSerializer(CampaignSerializer):
    metrics = CampaignMetricSerializer(many=True, read_only=True)

    class Meta(CampaignSerializer.Meta):
        fields = CampaignSerializer.Meta.fields + ["metrics"]
