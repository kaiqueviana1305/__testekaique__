from django.contrib import admin
from .models import Campaign, CampaignMetric


class CampaignMetricInline(admin.TabularInline):
    model = CampaignMetric
    extra = 0
    readonly_fields = ("synced_at",)


@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ("name", "platform", "status", "connection", "updated_at")
    list_filter = ("platform", "status")
    search_fields = ("name", "external_id")
    inlines = [CampaignMetricInline]


@admin.register(CampaignMetric)
class CampaignMetricAdmin(admin.ModelAdmin):
    list_display = ("campaign", "date_from", "date_to", "spend", "clicks", "leads", "cpl")
    list_filter = ("campaign__platform",)
    search_fields = ("campaign__name",)
