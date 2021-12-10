# Generated by Django 2.2 on 2021-12-09 15:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tweets', '0009_auto_20211206_1528'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tweet',
            name='content',
            field=models.TextField(blank=True, max_length=150, null=True),
        ),
        migrations.CreateModel(
            name='TweetComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True, max_length=150, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('tweet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tweets.Tweet')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='tweet',
            name='comments',
            field=models.ManyToManyField(blank=True, related_name='tweet_comments', through='tweets.TweetComment', to=settings.AUTH_USER_MODEL),
        ),
    ]
