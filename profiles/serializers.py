from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


# def even_number(value):
#     if value == "123":
#         raise serializers.ValidationError("password is weak")


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name", "password"]
        extra_kwargs = {
            "username": {"required": False},
            "password": {"required": False, "validators": [validate_password]},
        }

    def get_username(self, obj):
        return obj.username


class ProfileGeneralSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ["username", "first_name", "last_name", "location", "bio"]

    def get_username(self, obj):
        return obj.user.username

    def get_first_name(self, obj):
        return obj.user.first_name

    def get_last_name(self, obj):
        return obj.user.last_name


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = Profile
        fields = ["location", "bio", "user"]

    def update(self, instance, validated_data):
        print(validated_data)
        user = instance.user
        user_data = validated_data.pop("user")
        user.first_name = user_data.get("first_name", user.first_name)
        user.last_name = user_data.get("last_name", user.last_name)
        user.username = user_data.get("username", user.username)
        user.email = user_data.get("email", user.email)
        user.save()

        instance.location = validated_data.get("location", instance.location)
        instance.bio = validated_data.get("bio", instance.bio)
        instance.save()

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        user = User()
        user.first_name = user_data.get("first_name")
        user.last_name = user_data.get("last_name")
        user.username = user_data.get("username")
        user.email = user_data.get("email")
        user.password = user_data.get("password")
        user.save()

        profile = Profile()
        profile.location = validated_data.get("location")
        profile.bio = validated_data.get("bio")
        profile.user = user
        profile.save()

        return profile
