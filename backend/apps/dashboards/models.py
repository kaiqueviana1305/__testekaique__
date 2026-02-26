from django.db import models
from django.conf import settings


class Dashboard(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="dashboards",
    )
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    # Platforms to show in this dashboard (list of platform keys)
    platforms = models.JSONField(default=list)
    # Default date preset
    date_preset = models.CharField(
        max_length=20,
        default="last_30_days",
        choices=[
            ("last_7_days", "Últimos 7 dias"),
            ("last_14_days", "Últimos 14 dias"),
            ("last_30_days", "Últimos 30 dias"),
            ("this_month", "Este mês"),
            ("last_month", "Mês passado"),
            ("custom", "Personalizado"),
        ],
    )
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Dashboard"
        verbose_name_plural = "Dashboards"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.username} - {self.name}"

    def save(self, *args, **kwargs):
        # Only one default dashboard per user
        if self.is_default:
            Dashboard.objects.filter(user=self.user, is_default=True).exclude(pk=self.pk).update(is_default=False)
        super().save(*args, **kwargs)
