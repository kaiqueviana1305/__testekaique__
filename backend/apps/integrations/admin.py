from django.contrib import admin
from .models import PlatformConnection


@admin.register(PlatformConnection)
class PlatformConnectionAdmin(admin.ModelAdmin):
    list_display = ("user", "platform", "name", "auth_method", "is_active", "last_sync_at")
    list_filter = ("platform", "auth_method", "is_active")
    search_fields = ("user__username", "name", "account_id")
    readonly_fields = ("created_at", "updated_at", "last_sync_at")
