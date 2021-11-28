from django.contrib.auth.models import User
from rest_framework import authentication


class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        user = qs.order_by("?").first()
        print(user)
        return (user, None)
