from django.urls import path
from .views import (
    profile_detail_general_view,
    profile_detail_update_view,
    profile_create_view,
)

"""
CLIENT
Base ENDPOINT /api/profile/
"""
urlpatterns = [
    path("general/<str:username>/", profile_detail_general_view),
    path("create/", profile_create_view),
    path("", profile_detail_update_view),
]
