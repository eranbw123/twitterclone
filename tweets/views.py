from django.conf import settings

from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated

from .models import Tweet, TweetComment
from .serializers import (
    MAX_TWEET_LENGTH,
    TweetSerializer,
    TweetActionSerializer,
    TweetCreateSerializer,
    TweetDetailSerializer,
)

ALLOWED_HOSTS = settings.ALLOWED_HOSTS


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tweet_create_view(request, *args, **kwargs):
    serializer = TweetCreateSerializer(data=request.data or None)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = TweetDetailSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(["DELETE", "POST"])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({"message": "You cannot delete this tweet"}, status=401)
    obj = qs.first()
    obj.delete()
    return Response({"message": "Tweet removed"}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    """
    id is required
    Action options are: like, unlike, retweet
    """
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        comment_id = data.get("comment_id")
    qs = Tweet.objects.filter(id=tweet_id)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    if action == "like":
        obj.likes.add(request.user)
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=200)
    elif action == "unlike":
        obj.likes.remove(request.user)
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=200)
    elif action == "retweet":
        Tweet.objects.create(user=request.user, parent=obj, content=content)
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=201)
    elif action == "comment":
        new_comment = TweetComment(user=request.user, tweet=obj, content=content)
        new_comment.save()
        serializer = TweetSerializer(obj)
        return Response(serializer.data, status=201)
    elif action == "delete_comment":
        comments = TweetComment.objects.filter(tweet_id=tweet_id)
        comment = comments.filter(id=comment_id)
        if comment:
            if comment.first().user == request.user:
                comment.delete()
                serializer = TweetDetailSerializer(obj)
                return Response(serializer.data, status=200)
            else:
                return Response({"its not your comment"}, status=403)

        else:
            return Response({"comment does not exist"}, status=404)
    return Response({}, status=200)


@api_view(["GET"])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get("username")  # ?username=eran
    if username:
        qs = qs.filter(user__username__iexact=username)
    serializer = TweetSerializer(qs, many=True)
    return Response(serializer.data, status=200)
