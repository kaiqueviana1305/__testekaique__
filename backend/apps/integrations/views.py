import secrets
from django.utils import timezone
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import PlatformConnection
from .serializers import PlatformConnectionSerializer, ManualConnectionSerializer
from .services import meta_service, linkedin_service, google_ads_service, google_sheets_service


class ConnectionListView(generics.ListAPIView):
    serializer_class = PlatformConnectionSerializer

    def get_queryset(self):
        return PlatformConnection.objects.filter(user=self.request.user)


class ConnectionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PlatformConnectionSerializer

    def get_queryset(self):
        return PlatformConnection.objects.filter(user=self.request.user)


class ManualConnectionView(APIView):
    """Create a platform connection via manual credentials."""

    def post(self, request):
        serializer = ManualConnectionSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        connection = serializer.save()
        return Response(PlatformConnectionSerializer(connection).data, status=status.HTTP_201_CREATED)


# ─── OAuth: URL generators ────────────────────────────────────────────────────

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def meta_oauth_url(request):
    state = secrets.token_urlsafe(16)
    request.session["oauth_state"] = state
    return Response({"url": meta_service.get_oauth_url(state)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def linkedin_oauth_url(request):
    state = secrets.token_urlsafe(16)
    request.session["oauth_state"] = state
    return Response({"url": linkedin_service.get_oauth_url(state)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def google_oauth_url(request):
    state = secrets.token_urlsafe(16)
    request.session["oauth_state"] = state
    return Response({"url": google_ads_service.get_oauth_url(state)})


# ─── OAuth: Callbacks ─────────────────────────────────────────────────────────

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def meta_callback(request):
    code = request.GET.get("code")
    if not code:
        return Response({"error": "Código OAuth ausente."}, status=400)
    try:
        token_data = meta_service.exchange_code_for_token(code)
        access_token = token_data["access_token"]
        accounts = meta_service.get_ad_accounts(access_token)
        return Response({"access_token": access_token, "accounts": accounts})
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def linkedin_callback(request):
    code = request.GET.get("code")
    if not code:
        return Response({"error": "Código OAuth ausente."}, status=400)
    try:
        token_data = linkedin_service.exchange_code_for_token(code)
        access_token = token_data["access_token"]
        accounts = linkedin_service.get_ad_accounts(access_token)
        return Response({"access_token": access_token, "accounts": accounts})
    except Exception as e:
        return Response({"error": str(e)}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def google_callback(request):
    code = request.GET.get("code")
    if not code:
        return Response({"error": "Código OAuth ausente."}, status=400)
    try:
        token_data = google_ads_service.exchange_code_for_token(code)
        return Response(token_data)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


# ─── Save connections after OAuth ────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def save_connection(request):
    """
    After user picks an account from the OAuth flow, save the connection.
    Expects: { platform, name, account_id, access_token, refresh_token (optional) }
    """
    data = request.data.copy()
    data["auth_method"] = "oauth"

    existing = PlatformConnection.objects.filter(
        user=request.user,
        platform=data.get("platform"),
        account_id=data.get("account_id"),
    ).first()

    if existing:
        for field in ("access_token", "refresh_token", "name"):
            if data.get(field):
                setattr(existing, field, data[field])
        existing.is_active = True
        existing.save()
        return Response(PlatformConnectionSerializer(existing).data)

    conn = PlatformConnection.objects.create(
        user=request.user,
        platform=data.get("platform"),
        name=data.get("name", ""),
        account_id=data.get("account_id", ""),
        access_token=data.get("access_token", ""),
        refresh_token=data.get("refresh_token", ""),
        auth_method="oauth",
    )
    return Response(PlatformConnectionSerializer(conn).data, status=status.HTTP_201_CREATED)


# ─── Google Sheets: test read ─────────────────────────────────────────────────

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def sheets_preview(request):
    """
    Preview data from a Google Sheet.
    Expects: { connection_id, spreadsheet_id, sheet_range (optional) }
    """
    connection_id = request.data.get("connection_id")
    spreadsheet_id = request.data.get("spreadsheet_id")
    sheet_range = request.data.get("sheet_range", "Sheet1!A1:Z")

    try:
        conn = PlatformConnection.objects.get(id=connection_id, user=request.user)
    except PlatformConnection.DoesNotExist:
        return Response({"error": "Conexão não encontrada."}, status=404)

    try:
        rows = google_sheets_service.read_sheet(conn.access_token, spreadsheet_id, sheet_range)
        return Response({"count": len(rows), "rows": rows[:10]})
    except Exception as e:
        return Response({"error": str(e)}, status=400)
