from typing_extensions import Required
from django.db import models
from django.contrib.auth.models import User

# intermediate table to store extra data, used with through
class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]


class TweetComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE)
    content = models.TextField(blank=True, null=True, max_length=150)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]


class Tweet(models.Model):
    # blank = required in django, null = required in the DataBase
    parent = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets")
    # many users can many tweets, but only one user to each tweet
    likes = models.ManyToManyField(
        User, related_name="tweet_user", blank=True, through=TweetLike
    )  # many users can like this tweet
    comments = models.ManyToManyField(
        User, related_name="tweet_comments", blank=True, through=TweetComment
    )
    content = models.TextField(blank=True, null=True, max_length=150)
    image = models.FileField(upload_to="image/", blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.content} ({self.id})"

    class Meta:
        ordering = ["-id"]

    @property
    def is_retweet(self):
        return self.parent != None
