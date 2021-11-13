from django.db import models
import random


class Tweet(models.Model):
    # blank = required in django, null = required in the DataBase
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to="image/", blank=True, null=True)

    class Meta:
        ordering = ["-id"]

    def serialize(self):
        return {"id": self.id, "content": self.content, "likes": random.randint(0, 200)}
