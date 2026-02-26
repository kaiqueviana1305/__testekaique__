from django.db import models
from django.conf import settings
from apps.integrations.models import PlatformConnection


class Campaign(models.Model):
    PLATFORM_CHOICES = [
        ("meta", "Meta Ads"),
        ("linkedin", "LinkedIn Ads"),
        ("google_ads", "Google Ads"),
    ]

    STATUS_CHOICES = [
        ("ACTIVE", "Ativa"),
        ("PAUSED", "Pausada"),
        ("ARCHIVED", "Arquivada"),
        ("DELETED", "Deletada"),
        ("UNKNOWN", "Desconhecida"),
    ]

    connection = models.ForeignKey(
        PlatformConnection,
        on_delete=models.CASCADE,
        related_name="campaigns",
    )
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    external_id = models.CharField(max_length=200, blank=True)
    name = models.CharField(max_length=500)
    status = models.CharField(max_length=50, default="UNKNOWN")
    objective = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Campanha"
        verbose_name_plural = "Campanhas"
        unique_together = ("connection", "external_id")
        ordering = ["-updated_at"]

    def __str__(self):
        return f"[{self.platform}] {self.name}"


class CampaignMetric(models.Model):
    """Daily/ranged metrics snapshot for a campaign."""

    campaign = models.ForeignKey(
        Campaign,
        on_delete=models.CASCADE,
        related_name="metrics",
    )
    date_from = models.DateField()
    date_to = models.DateField()

    # Volume
    impressions = models.BigIntegerField(default=0)
    clicks = models.BigIntegerField(default=0)
    reach = models.BigIntegerField(default=0)
    leads = models.BigIntegerField(default=0)

    # Cost
    spend = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    # Computed rates
    ctr = models.DecimalField(max_digits=8, decimal_places=4, default=0, help_text="Click-Through Rate (%)")
    cpc = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Cost per Click")
    cpm = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Cost per 1000 Impressions")
    cpl = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Cost per Lead")
    roas = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text="Return on Ad Spend")

    synced_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Métrica de Campanha"
        verbose_name_plural = "Métricas de Campanhas"
        unique_together = ("campaign", "date_from", "date_to")
        ordering = ["-date_from"]

    def __str__(self):
        return f"{self.campaign.name} ({self.date_from} → {self.date_to})"
