from rest_framework import generics
from .models import Dashboard
from .serializers import DashboardSerializer


class DashboardListCreateView(generics.ListCreateAPIView):
    serializer_class = DashboardSerializer

    def get_queryset(self):
        return Dashboard.objects.filter(user=self.request.user)


class DashboardDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DashboardSerializer

    def get_queryset(self):
        return Dashboard.objects.filter(user=self.request.user)
