from django.db import models
import random

# from django.conf import settings
from django.contrib.auth.models import User

# User = settings.AUTH_USER_MODEL


class Tweet(models.Model):
    # blank = required in django, null = required in the DataBase
    user = models.ForeignKey(
        User, on_delete=models.CASCADE
    )  # many users can many tweets
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="image/", blank=True, null=True)

    def __str__(self):
        return f"{self.content} ({self.id})"

    class Meta:
        ordering = ["-id"]

    def serialize(self):
        return {"id": self.id, "content": self.content, "likes": random.randint(0, 200)}
