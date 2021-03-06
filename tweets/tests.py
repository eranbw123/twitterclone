from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

from .models import Tweet


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="password")
        self.userb = User.objects.create_user(username="test2", password="password2")
        Tweet.objects.create(user=self.user, content="my first tweet")
        Tweet.objects.create(user=self.user, content="my second tweet")
        Tweet.objects.create(user=self.userb, content="my third tweet")
        self.curret_count = Tweet.objects.all().count()

    def get_client(self):
        client = APIClient()
        response = client.post(
            "/api/auth/token/login/",
            {"username": self.user.username, "password": "password"},
        )
        token = response.json().get("auth_token")
        client.credentials(HTTP_AUTHORIZATION="Token " + token)
        return client

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(user=self.user, content="my fourth tweet")
        self.assertEqual(tweet_obj.id, 4)
        self.assertEqual(tweet_obj.user, self.user)

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get("/api/tweets/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_tweets_related_name(self):
        user = self.user
        self.assertEqual(user.tweets.count(), 2)

    def test_action_like(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "like"})
        like_count = response.json().get("likes")
        my_like_instances_count = self.user.tweetlike_set.count()
        my_related_likes_count = self.user.tweet_user.count()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 1)
        self.assertEqual(my_like_instances_count, 1)
        self.assertEqual(my_related_likes_count, my_like_instances_count)

    def test_action_unlike(self):
        client = self.get_client()
        response = client.post("/api/tweets/action/", {"id": 1, "action": "unlike"})
        like_count = response.json().get("likes")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(like_count, 0)

    def test_action_retweet(self):
        client = self.get_client()
        current_count = self.curret_count
        response = client.post("/api/tweets/action/", {"id": 1, "action": "retweet"})
        data = response.json()
        new_tweet_id = data.get("id")
        self.assertEqual(response.status_code, 201)
        self.assertNotEqual(2, new_tweet_id)
        self.assertEqual(current_count + 1, new_tweet_id)

    def test_tweet_create_api_view(self):
        request_data = {"content": "This is my test tweet"}
        current_count = self.curret_count
        client = self.get_client()
        response = client.post("/api/tweets/create/", request_data)
        new_tweet_id = response.json().get("id")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(current_count + 1, new_tweet_id)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        tweet_id = Tweet.objects.all().first().id
        response = client.get(f"/api/tweets/1/")
        self.assertEqual(response.status_code, 200)

    def test_tweet_delete(self):
        client = self.get_client()
        prev_count = self.curret_count
        tweet_id = Tweet.objects.all().first().id
        response = client.post(f"/api/tweets/1/delete/")
        new_count = Tweet.objects.all().count()
        response = client.post(f"/api/tweets/10/delete/")
        response = client.post(f"/api/tweets/3/delete/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(new_count, prev_count - 1)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.status_code, 401)
