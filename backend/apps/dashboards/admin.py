from django.contrib import admin
from .models import Dashboard


@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    list_display = ("name", "user", "platforms", "date_preset", "is_default", "created_at")
    list_filter = ("date_preset", "is_default")
    search_fields = ("name", "user__username")
