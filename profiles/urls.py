from django.urls import path
from .views import profile_detail_view

"""
CLIENT
Base ENDPOINT /api/profile/
"""
urlpatterns = [
    path("<str:username>/", profile_detail_view),
]
