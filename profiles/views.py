from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from .serializers import ProfileGeneralSerializer, ProfileSerializer
from .models import Profile


@api_view(["POST"])
def profile_create_view(request, *args, **kwargs):
    if request.method == "POST":
        serializer = ProfileSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data or None, status=201)
        else:
            return Response(serializer.errors or None, status=400)


@api_view(["GET"])
def profile_detail_general_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username__iexact=username)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = ProfileGeneralSerializer(obj)
    return Response(serializer.data, status=200)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def profile_detail_update_view(request, *args, **kwargs):
    if request.method == "GET":
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data or None, status=200)
    if request.method == "POST":
        serializer = ProfileSerializer(request.user.profile, data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data or None, status=200)
        else:
            return Response(serializer.errors or None, status=400)
