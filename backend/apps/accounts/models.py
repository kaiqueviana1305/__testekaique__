from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    company = models.CharField(max_length=200, blank=True)
    timezone = models.CharField(max_length=50, default="America/Sao_Paulo")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Usuário"
        verbose_name_plural = "Usuários"
