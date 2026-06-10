import uuid
from django.db import models

class WeatherChatHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    farm_id = models.UUIDField()
    user_id = models.UUIDField(null=True, blank=True)
    question = models.TextField()
    answer = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'weather_chat_history'
        verbose_name = 'Weather Chat History'
        verbose_name_plural = 'Weather Chat Histories'
