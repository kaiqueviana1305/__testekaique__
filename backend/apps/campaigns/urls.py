from django.urls import path
from . import views

urlpatterns = [
    path("", views.CampaignListView.as_view(), name="campaign-list"),
    path("<int:pk>/", views.CampaignDetailView.as_view(), name="campaign-detail"),
    path("sync/", views.SyncView.as_view(), name="campaign-sync"),
    path("kpis/", views.kpi_summary, name="kpi-summary"),
    path("kpis/by-platform/", views.kpi_by_platform, name="kpi-by-platform"),
    path("kpis/timeseries/", views.metrics_timeseries, name="kpi-timeseries"),
]
