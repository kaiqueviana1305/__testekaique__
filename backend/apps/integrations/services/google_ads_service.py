"""
Google Ads API integration via REST (OAuth2).
Docs: https://developers.google.com/google-ads/api/docs/start
"""
import requests
from django.conf import settings


GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_ADS_API_URL = "https://googleads.googleapis.com/v16"

OAUTH_SCOPES = "https://www.googleapis.com/auth/adwords"


def get_oauth_url(state: str) -> str:
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": OAUTH_SCOPES,
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{GOOGLE_AUTH_URL}?{query}"


def exchange_code_for_token(code: str) -> dict:
    resp = requests.post(GOOGLE_TOKEN_URL, data={
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    })
    resp.raise_for_status()
    return resp.json()


def refresh_access_token(refresh_token: str) -> dict:
    resp = requests.post(GOOGLE_TOKEN_URL, data={
        "refresh_token": refresh_token,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "grant_type": "refresh_token",
    })
    resp.raise_for_status()
    return resp.json()


def fetch_campaigns(access_token: str, customer_id: str, date_from: str, date_to: str) -> list[dict]:
    """
    Fetch campaign performance using Google Ads Query Language (GAQL).
    customer_id: e.g. "1234567890" (sem hífens)
    """
    clean_customer_id = customer_id.replace("-", "")
    headers = {
        "Authorization": f"Bearer {access_token}",
        "developer-token": settings.GOOGLE_DEVELOPER_TOKEN,
        "Content-Type": "application/json",
    }

    query = f"""
        SELECT
            campaign.id,
            campaign.name,
            campaign.status,
            campaign.advertising_channel_type,
            metrics.impressions,
            metrics.clicks,
            metrics.cost_micros,
            metrics.ctr,
            metrics.average_cpc,
            metrics.average_cpm,
            metrics.conversions
        FROM campaign
        WHERE segments.date BETWEEN '{date_from}' AND '{date_to}'
          AND campaign.status != 'REMOVED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 500
    """

    resp = requests.post(
        f"{GOOGLE_ADS_API_URL}/customers/{clean_customer_id}/googleAds:search",
        headers=headers,
        json={"query": query},
    )
    resp.raise_for_status()
    rows = resp.json().get("results", [])
    return [_normalize_campaign(row) for row in rows]


def _normalize_campaign(row: dict) -> dict:
    campaign = row.get("campaign", {})
    metrics = row.get("metrics", {})

    spend = int(metrics.get("costMicros", 0)) / 1_000_000
    clicks = int(metrics.get("clicks", 0))
    impressions = int(metrics.get("impressions", 0))
    conversions = float(metrics.get("conversions", 0))
    ctr = float(metrics.get("ctr", 0)) * 100
    cpc = int(metrics.get("averageCpc", 0)) / 1_000_000
    cpm = int(metrics.get("averageCpm", 0)) / 1_000_000
    cpl = (spend / conversions) if conversions > 0 else 0

    return {
        "platform": "google_ads",
        "external_id": str(campaign.get("id", "")),
        "name": campaign.get("name", ""),
        "status": campaign.get("status", ""),
        "objective": campaign.get("advertisingChannelType", ""),
        "spend": round(spend, 2),
        "impressions": impressions,
        "clicks": clicks,
        "reach": 0,
        "leads": int(conversions),
        "cpc": round(cpc, 2),
        "cpm": round(cpm, 2),
        "ctr": round(ctr, 4),
        "cpl": round(cpl, 2),
    }
