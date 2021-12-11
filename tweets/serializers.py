from rest_framework import serializers
from django.conf import settings
from .models import Tweet, TweetComment, TweetLike
from profiles.serializers import UserSerializer

MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTION = settings.TWEET_ACTION_OPTION


class TweetCommentsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TweetComment
        fields = ["timestamp", "content", "user", "id"]


class TweetLikesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TweetComment
        fields = ["timestamp", "content", "user"]


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)
    comment_id = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTION:
            raise serializers.ValidationError("This is not a valid action for tweets")
        return value

    def validate_content(self, value):
        if value and len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError(
                "Ensure this field has no more than 150 characters."
            )
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ["id", "content", "likes", "username"]

    def get_likes(self, obj):
        return obj.likes.count()

    def get_username(self, obj):
        return obj.user.username

    def validate_content(self, value):
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long")
        return value


class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = [
            "id",
            "content",
            "likes",
            "is_retweet",
            "parent",
            "username",
            "comments",
        ]
        depth = 3

    def get_likes(self, obj):
        return obj.likes.count()

    def get_username(self, obj):
        return obj.user.username

    def get_comments(self, obj):
        return obj.comments.count()


class TweetDetailSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    likes_list = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)
    comments = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = [
            "id",
            "content",
            "likes",
            "is_retweet",
            "parent",
            "username",
            "comments",
            "likes_list",
        ]
        depth = 3

    def get_username(self, obj):
        return obj.user.username

    def get_likes(self, obj):
        return obj.likes.count()

    def get_likes_list(self, obj):
        serializer = TweetLikesSerializer(
            TweetLike.objects.filter(tweet=obj), many=True
        )
        return serializer.data

    def get_comments(self, obj):
        serializer = TweetCommentsSerializer(
            TweetComment.objects.filter(tweet=obj), many=True
        )
        return serializer.data
