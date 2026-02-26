from django.urls import path
from . import views

urlpatterns = [
    # Connections CRUD
    path("connections/", views.ConnectionListView.as_view(), name="connection-list"),
    path("connections/<int:pk>/", views.ConnectionDetailView.as_view(), name="connection-detail"),
    path("connections/manual/", views.ManualConnectionView.as_view(), name="connection-manual"),
    path("connections/save/", views.save_connection, name="connection-save"),

    # OAuth URLs
    path("meta/auth/", views.meta_oauth_url, name="meta-auth"),
    path("linkedin/auth/", views.linkedin_oauth_url, name="linkedin-auth"),
    path("google/auth/", views.google_oauth_url, name="google-auth"),

    # OAuth Callbacks
    path("meta/callback/", views.meta_callback, name="meta-callback"),
    path("linkedin/callback/", views.linkedin_callback, name="linkedin-callback"),
    path("google/callback/", views.google_callback, name="google-callback"),

    # Sheets
    path("sheets/preview/", views.sheets_preview, name="sheets-preview"),
]
