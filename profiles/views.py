from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
)
from .serializers import ProfileSerializer
from .models import Profile


@api_view(["GET"])
def profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username__iexact=username)
    if not qs.exists():
        return Response({}, status=404)
    obj = qs.first()
    serializer = ProfileSerializer(obj)
    return Response(serializer.data, status=200)
