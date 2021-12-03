from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    # likes = serializers.SerializerMethodField(read_only=True)
    # parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ["location", "bio"]

    # def get_likes(self, obj):
    #     return obj.likes.count()
