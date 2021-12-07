from django.test import TestCase
from .models import Profile
from django.contrib.auth.models import User


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="test", password="password")
        self.userb = User.objects.create_user(username="test2", password="password2")

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_folowing(self):
        first = self.user
        second = self.userb
        first.profile.followers.add(second)
        qs = second.following.filter(user=first)
        qs1 = first.following.all()
        print(qs)
        print(qs1)
