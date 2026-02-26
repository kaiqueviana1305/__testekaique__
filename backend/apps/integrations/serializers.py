from rest_framework import serializers
from .models import PlatformConnection


class PlatformConnectionSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source="get_platform_display", read_only=True)
    auth_method_display = serializers.CharField(source="get_auth_method_display", read_only=True)

    class Meta:
        model = PlatformConnection
        fields = [
            "id", "platform", "platform_display", "auth_method", "auth_method_display",
            "name", "account_id", "extra_config", "is_active", "last_sync_at",
            "created_at", "updated_at",
        ]
        read_only_fields = ["id", "last_sync_at", "created_at", "updated_at"]


class ManualConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformConnection
        fields = ["platform", "name", "account_id", "extra_config", "access_token"]

    def validate(self, data):
        data["auth_method"] = "manual"
        return data

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
