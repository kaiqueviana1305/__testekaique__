from django.urls import path
from .views import DashboardListCreateView, DashboardDetailView

urlpatterns = [
    path("", DashboardListCreateView.as_view(), name="dashboard-list"),
    path("<int:pk>/", DashboardDetailView.as_view(), name="dashboard-detail"),
]
