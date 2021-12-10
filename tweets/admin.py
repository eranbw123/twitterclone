from django.contrib import admin

from .models import Tweet, TweetLike, TweetComment


class TweetLikeAdmin(admin.TabularInline):
    model = TweetLike


class TweetTweetComment(admin.TabularInline):
    model = TweetComment


class TweetAdmin(admin.ModelAdmin):
    inlines = [TweetLikeAdmin, TweetTweetComment]
    list_display = ["__str__", "user"]
    search_fields = ["content", "user__username", "user__email"]

    class Meta:
        model = Tweet


admin.site.register(Tweet, TweetAdmin)
