"""
Meta (Facebook) Ads API integration.
Docs: https://developers.facebook.com/docs/marketing-api
"""
import requests
from django.conf import settings
from datetime import datetime


META_GRAPH_URL = "https://graph.facebook.com/v19.0"
META_AUTH_URL = "https://www.facebook.com/v19.0/dialog/oauth"
META_TOKEN_URL = f"{META_GRAPH_URL}/oauth/access_token"

OAUTH_SCOPES = "ads_read,ads_management,business_management,read_insights"


def get_oauth_url(state: str) -> str:
    params = {
        "client_id": settings.META_APP_ID,
        "redirect_uri": settings.META_REDIRECT_URI,
        "scope": OAUTH_SCOPES,
        "state": state,
        "response_type": "code",
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{META_AUTH_URL}?{query}"


def exchange_code_for_token(code: str) -> dict:
    resp = requests.get(META_TOKEN_URL, params={
        "client_id": settings.META_APP_ID,
        "client_secret": settings.META_APP_SECRET,
        "redirect_uri": settings.META_REDIRECT_URI,
        "code": code,
    })
    resp.raise_for_status()
    return resp.json()


def get_ad_accounts(access_token: str) -> list[dict]:
    resp = requests.get(
        f"{META_GRAPH_URL}/me/adaccounts",
        params={
            "access_token": access_token,
            "fields": "id,name,account_status,currency,timezone_name",
        },
    )
    resp.raise_for_status()
    return resp.json().get("data", [])


def fetch_campaigns(access_token: str, account_id: str, date_from: str, date_to: str) -> list[dict]:
    """
    Fetch campaigns with insights for a given date range.
    date_from / date_to: "YYYY-MM-DD"
    """
    resp = requests.get(
        f"{META_GRAPH_URL}/act_{account_id}/campaigns",
        params={
            "access_token": access_token,
            "fields": (
                "id,name,status,objective,"
                "insights.date_preset(custom){"
                "impressions,clicks,spend,reach,cpc,cpm,ctr,"
                "actions,cost_per_action_type"
                "}"
            ),
            "time_range": f'{{"since":"{date_from}","until":"{date_to}"}}',
            "limit": 500,
        },
    )
    resp.raise_for_status()
    raw = resp.json().get("data", [])
    return [_normalize_campaign(c) for c in raw]


def _normalize_campaign(raw: dict) -> dict:
    insights = raw.get("insights", {}).get("data", [{}])[0] if raw.get("insights") else {}

    spend = float(insights.get("spend", 0))
    clicks = int(insights.get("clicks", 0))
    impressions = int(insights.get("impressions", 0))
    reach = int(insights.get("reach", 0))
    cpc = float(insights.get("cpc", 0))
    cpm = float(insights.get("cpm", 0))
    ctr = float(insights.get("ctr", 0))

    # Count leads from actions
    actions = insights.get("actions", [])
    leads = sum(
        int(a.get("value", 0))
        for a in actions
        if a.get("action_type") in ("lead", "offsite_conversion.lead")
    )
    cpl = (spend / leads) if leads > 0 else 0

    return {
        "platform": "meta",
        "external_id": raw["id"],
        "name": raw.get("name", ""),
        "status": raw.get("status", ""),
        "objective": raw.get("objective", ""),
        "spend": spend,
        "impressions": impressions,
        "clicks": clicks,
        "reach": reach,
        "leads": leads,
        "cpc": cpc,
        "cpm": cpm,
        "ctr": ctr,
        "cpl": cpl,
    }
