from django.urls import path
from .views import WeatherAdvisoryAPIView, WeatherChatAPIView

urlpatterns = [
    path('weather-advisory/', WeatherAdvisoryAPIView.as_view(), name='weather_advisory'),
    path('weather-chat/', WeatherChatAPIView.as_view(), name='weather_chat'),
]
