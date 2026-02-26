from django.db import models
from django.conf import settings


class PlatformConnection(models.Model):
    PLATFORM_CHOICES = [
        ("meta", "Meta Ads"),
        ("linkedin", "LinkedIn Ads"),
        ("google_ads", "Google Ads"),
        ("google_sheets", "Google Sheets"),
    ]

    AUTH_METHOD_CHOICES = [
        ("oauth", "OAuth 2.0"),
        ("manual", "Credenciais Manuais"),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="platform_connections",
    )
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    auth_method = models.CharField(max_length=10, choices=AUTH_METHOD_CHOICES, default="oauth")
    name = models.CharField(max_length=200, help_text="Nome amigável para esta conexão")

    # OAuth fields
    access_token = models.TextField(blank=True)
    refresh_token = models.TextField(blank=True)
    token_expires_at = models.DateTimeField(null=True, blank=True)

    # Manual credential fields (platform-specific identifiers)
    account_id = models.CharField(max_length=200, blank=True, help_text="ID da conta de anúncios")
    extra_config = models.JSONField(default=dict, blank=True, help_text="Configurações extras (ex: spreadsheet_id)")

    is_active = models.BooleanField(default=True)
    last_sync_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Conexão de Plataforma"
        verbose_name_plural = "Conexões de Plataformas"
        unique_together = ("user", "platform", "account_id")

    def __str__(self):
        return f"{self.user.username} - {self.get_platform_display()} ({self.name})"
