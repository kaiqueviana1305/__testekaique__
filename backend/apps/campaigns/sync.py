"""
Campaign sync logic — fetches data from each platform and upserts Campaign + CampaignMetric.
"""
from django.utils import timezone
from apps.integrations.models import PlatformConnection
from apps.integrations.services import meta_service, linkedin_service, google_ads_service, google_sheets_service
from .models import Campaign, CampaignMetric


def sync_connection(connection: PlatformConnection, date_from: str, date_to: str) -> dict:
    """
    Fetch campaigns for a connection and upsert into DB.
    Returns summary dict.
    """
    platform = connection.platform
    access_token = connection.access_token
    account_id = connection.account_id

    if platform == "meta":
        raw_campaigns = meta_service.fetch_campaigns(access_token, account_id, date_from, date_to)
    elif platform == "linkedin":
        raw_campaigns = linkedin_service.fetch_campaigns(access_token, account_id, date_from, date_to)
    elif platform == "google_ads":
        raw_campaigns = google_ads_service.fetch_campaigns(access_token, account_id, date_from, date_to)
    elif platform == "google_sheets":
        spreadsheet_id = connection.extra_config.get("spreadsheet_id", "")
        sheet_range = connection.extra_config.get("sheet_range", "Sheet1!A1:Z")
        raw_campaigns = google_sheets_service.read_sheet(access_token, spreadsheet_id, sheet_range)
    else:
        return {"error": f"Plataforma '{platform}' não suportada."}

    created = 0
    updated = 0

    for raw in raw_campaigns:
        campaign, was_created = Campaign.objects.update_or_create(
            connection=connection,
            external_id=raw.get("external_id", raw.get("name", "")),
            defaults={
                "platform": raw.get("platform", platform),
                "name": raw.get("name", ""),
                "status": raw.get("status", "UNKNOWN"),
                "objective": raw.get("objective", ""),
            },
        )

        CampaignMetric.objects.update_or_create(
            campaign=campaign,
            date_from=raw.get("date_from", date_from),
            date_to=raw.get("date_to", date_to),
            defaults={
                "impressions": raw.get("impressions", 0),
                "clicks": raw.get("clicks", 0),
                "reach": raw.get("reach", 0),
                "leads": raw.get("leads", 0),
                "spend": raw.get("spend", 0),
                "ctr": raw.get("ctr", 0),
                "cpc": raw.get("cpc", 0),
                "cpm": raw.get("cpm", 0),
                "cpl": raw.get("cpl", 0),
            },
        )

        if was_created:
            created += 1
        else:
            updated += 1

    connection.last_sync_at = timezone.now()
    connection.save(update_fields=["last_sync_at"])

    return {"created": created, "updated": updated, "total": len(raw_campaigns)}
