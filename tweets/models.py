from django.db import models

class Tweet(models.Model):
    # blank = required in django, null = required in the DataBase
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='image/', blank=True, null=True)
