from django.test import TestCase
from django.contrib.auth.models import User

from rest_framework.test import APIClient

from .models import Tweet


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="password")
        Tweet.objects.create(user=self.user, content="my first tweet")
        Tweet.objects.create(user=self.user, content="my second tweet")
        Tweet.objects.create(user=self.user, content="my third tweet")

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(user=self.user, content="my second fourth")
        self.assertEqual(tweet_obj.id, 4)
        self.assertEqual(tweet_obj.user, self.user)

    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password="password")
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "like"})
        self.assertEqual(response.status_code, 200)
        # print(response.json())

    # def test_tweet_list(self):
    #     client = self.get_client()
    #     response = client.get("/api/tweets/")
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(len(response.json()), 3)

    # def test_tweet_list(self):

    #     client = self.get_client()
    #     response = client.get("/api/tweets/")
    #     self.assertEqual(response.status_code, 200)
    #     self.assertEqual(len(response.json()), 3)
