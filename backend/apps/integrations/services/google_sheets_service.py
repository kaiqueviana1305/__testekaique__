"""
Google Sheets API integration — leitura de dados de campanhas.
Docs: https://developers.google.com/sheets/api

Formato esperado da planilha (cabeçalho na linha 1):
| platform | name | status | date_from | date_to | spend | impressions | clicks | leads | cpc | cpm | ctr | cpl |

O campo 'platform' deve ser: meta, linkedin ou google_ads.
"""
import requests
from django.conf import settings


GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
SHEETS_API_URL = "https://sheets.googleapis.com/v4/spreadsheets"

OAUTH_SCOPES = (
    "https://www.googleapis.com/auth/spreadsheets.readonly "
    "https://www.googleapis.com/auth/drive.readonly"
)


def get_oauth_url(state: str) -> str:
    from apps.integrations.services.google_ads_service import get_oauth_url as ads_oauth
    # Reuse Google OAuth but with Sheets scopes
    from django.conf import settings
    params = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": OAUTH_SCOPES,
        "access_type": "offline",
        "prompt": "consent",
        "state": state,
    }
    from urllib.parse import urlencode
    base = "https://accounts.google.com/o/oauth2/v2/auth"
    return f"{base}?{urlencode(params)}"


def read_sheet(access_token: str, spreadsheet_id: str, sheet_range: str = "Sheet1!A1:Z") -> list[dict]:
    """
    Read campaign data from a Google Sheet.
    Returns list of dicts normalized for our campaign model.
    """
    headers = {"Authorization": f"Bearer {access_token}"}
    resp = requests.get(
        f"{SHEETS_API_URL}/{spreadsheet_id}/values/{sheet_range}",
        headers=headers,
    )
    resp.raise_for_status()
    data = resp.json()

    values = data.get("values", [])
    if not values or len(values) < 2:
        return []

    header = [col.strip().lower() for col in values[0]]
    rows = []
    for row_values in values[1:]:
        if not any(row_values):
            continue
        row = dict(zip(header, row_values))
        normalized = _normalize_row(row)
        if normalized:
            rows.append(normalized)

    return rows


def _normalize_row(row: dict) -> dict | None:
    platform = row.get("platform", "").strip().lower()
    if platform not in ("meta", "linkedin", "google_ads"):
        return None

    def _float(key):
        try:
            return float(str(row.get(key, 0)).replace(",", ".").replace("R$", "").strip() or 0)
        except (ValueError, TypeError):
            return 0.0

    def _int(key):
        try:
            return int(float(str(row.get(key, 0)).replace(",", "").strip() or 0))
        except (ValueError, TypeError):
            return 0

    spend = _float("spend")
    clicks = _int("clicks")
    impressions = _int("impressions")
    leads = _int("leads")

    return {
        "platform": platform,
        "external_id": row.get("id", ""),
        "name": row.get("name", row.get("campanha", "")),
        "status": row.get("status", ""),
        "objective": row.get("objective", row.get("objetivo", "")),
        "date_from": row.get("date_from", row.get("data_inicio", "")),
        "date_to": row.get("date_to", row.get("data_fim", "")),
        "spend": spend,
        "impressions": impressions,
        "clicks": clicks,
        "reach": _int("reach"),
        "leads": leads,
        "cpc": _float("cpc") or ((spend / clicks) if clicks > 0 else 0),
        "cpm": _float("cpm") or ((spend / impressions * 1000) if impressions > 0 else 0),
        "ctr": _float("ctr") or ((clicks / impressions * 100) if impressions > 0 else 0),
        "cpl": _float("cpl") or ((spend / leads) if leads > 0 else 0),
    }
