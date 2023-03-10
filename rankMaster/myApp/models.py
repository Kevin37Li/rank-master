from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    email = models.EmailField(null=True, blank=True)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id_lists = models.TextField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)


class Rank(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    id_list = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    ranking_list = models.TextField(null=True, blank=True)

