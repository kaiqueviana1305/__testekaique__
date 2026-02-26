"""
LinkedIn Marketing API integration.
Docs: https://learn.microsoft.com/en-us/linkedin/marketing/
"""
import requests
from django.conf import settings


LINKEDIN_AUTH_URL = "https://www.linkedin.com/oauth/v2/authorization"
LINKEDIN_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
LINKEDIN_API_URL = "https://api.linkedin.com/v2"

OAUTH_SCOPES = "r_ads,r_ads_reporting,r_organization_social"


def get_oauth_url(state: str) -> str:
    params = {
        "response_type": "code",
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "scope": OAUTH_SCOPES,
        "state": state,
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return f"{LINKEDIN_AUTH_URL}?{query}"


def exchange_code_for_token(code: str) -> dict:
    resp = requests.post(LINKEDIN_TOKEN_URL, data={
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "client_secret": settings.LINKEDIN_CLIENT_SECRET,
    })
    resp.raise_for_status()
    return resp.json()


def get_ad_accounts(access_token: str) -> list[dict]:
    headers = {"Authorization": f"Bearer {access_token}", "X-Restli-Protocol-Version": "2.0.0"}
    resp = requests.get(
        f"{LINKEDIN_API_URL}/adAccountsV2",
        headers=headers,
        params={"q": "search", "search.type.values[0]": "BUSINESS"},
    )
    resp.raise_for_status()
    return resp.json().get("elements", [])


def fetch_campaigns(access_token: str, account_id: str, date_from: str, date_to: str) -> list[dict]:
    """Fetch campaigns with analytics from LinkedIn."""
    headers = {"Authorization": f"Bearer {access_token}", "X-Restli-Protocol-Version": "2.0.0"}

    # Get campaigns list
    camp_resp = requests.get(
        f"{LINKEDIN_API_URL}/adCampaignsV2",
        headers=headers,
        params={"q": "search", "search.account.values[0]": f"urn:li:sponsoredAccount:{account_id}"},
    )
    camp_resp.raise_for_status()
    campaigns = camp_resp.json().get("elements", [])

    results = []
    start_date = _parse_date(date_from)
    end_date = _parse_date(date_to)

    for camp in campaigns:
        camp_id = camp["id"]
        analytics = _fetch_campaign_analytics(headers, camp_id, start_date, end_date)
        results.append(_normalize_campaign(camp, analytics))

    return results


def _fetch_campaign_analytics(headers: dict, campaign_id: int, start_date: dict, end_date: dict) -> dict:
    resp = requests.get(
        f"{LINKEDIN_API_URL}/adAnalyticsV2",
        headers=headers,
        params={
            "q": "analytics",
            "pivot": "CAMPAIGN",
            "dateRange.start.day": start_date["day"],
            "dateRange.start.month": start_date["month"],
            "dateRange.start.year": start_date["year"],
            "dateRange.end.day": end_date["day"],
            "dateRange.end.month": end_date["month"],
            "dateRange.end.year": end_date["year"],
            "campaigns[0]": f"urn:li:sponsoredCampaign:{campaign_id}",
            "fields": "impressions,clicks,costInLocalCurrency,leads,externalWebsiteConversions",
        },
    )
    if resp.status_code != 200:
        return {}
    elements = resp.json().get("elements", [{}])
    return elements[0] if elements else {}


def _parse_date(date_str: str) -> dict:
    year, month, day = date_str.split("-")
    return {"year": int(year), "month": int(month), "day": int(day)}


def _normalize_campaign(raw: dict, analytics: dict) -> dict:
    spend = float(analytics.get("costInLocalCurrency", 0))
    clicks = int(analytics.get("clicks", 0))
    impressions = int(analytics.get("impressions", 0))
    leads = int(analytics.get("leads", 0))
    cpc = (spend / clicks) if clicks > 0 else 0
    cpm = (spend / impressions * 1000) if impressions > 0 else 0
    ctr = (clicks / impressions * 100) if impressions > 0 else 0
    cpl = (spend / leads) if leads > 0 else 0

    return {
        "platform": "linkedin",
        "external_id": str(raw.get("id", "")),
        "name": raw.get("name", ""),
        "status": raw.get("status", ""),
        "objective": raw.get("objectiveType", ""),
        "spend": spend,
        "impressions": impressions,
        "clicks": clicks,
        "reach": 0,  # LinkedIn analytics doesn't directly expose reach at campaign level
        "leads": leads,
        "cpc": cpc,
        "cpm": cpm,
        "ctr": ctr,
        "cpl": cpl,
    }
