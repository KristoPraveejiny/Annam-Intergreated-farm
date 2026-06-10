# crop_disease_detection/django_api/django_api/urls.py

from django.urls import path, include

urlpatterns = [
    path('api/', include('api.urls')),
    path('api/', include('django_api.weather_advisory.urls')),
]
