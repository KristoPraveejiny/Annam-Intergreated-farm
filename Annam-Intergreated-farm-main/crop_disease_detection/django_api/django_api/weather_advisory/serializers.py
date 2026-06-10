# pyrefly: ignore [missing-import]
from rest_framework import serializers


class WeatherSerializer(serializers.Serializer):
    temperature = serializers.FloatField()
    humidity = serializers.IntegerField()
    condition = serializers.CharField()
    description = serializers.CharField(required=False, allow_blank=True, default='')
    wind_speed = serializers.FloatField()
    rain_prob = serializers.FloatField(required=False, default=0.0)
    icon = serializers.CharField(required=False, allow_blank=True, default='')
    city = serializers.CharField(required=False, allow_blank=True, default='')
    last_updated = serializers.CharField()


class AdvisorySerializer(serializers.Serializer):
    explanation = serializers.CharField()
    irrigation = serializers.CharField()
    fertilizer = serializers.CharField()
    pest_disease = serializers.CharField()
    activities = serializers.CharField()
    score = serializers.IntegerField(min_value=0, max_value=100)
    alerts = serializers.ListField(child=serializers.CharField(), required=False, default=list)


class WeatherAdvisoryResponseSerializer(serializers.Serializer):
    weather = WeatherSerializer(required=False, allow_null=True)
    advisory = AdvisorySerializer()


class WeatherChatRequestSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=2000)
    history = serializers.ListField(
        child=serializers.DictField(),
        required=False,
        default=list,
    )


class WeatherChatResponseSerializer(serializers.Serializer):
    answer = serializers.CharField()
    weather = WeatherSerializer(required=False, allow_null=True)
