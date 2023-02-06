# countries/serializers.py
from rest_framework import serializers
from .models import Order

from datetime import datetime
class OrderSerializer(serializers.ModelSerializer):
    received_time = serializers.DateTimeField(default=datetime.now)

    class Meta:
        model = Order
        fields = ["received_time", "topic", "message"]

    def create(self, validated_data):
        received_time = datetime.now().isoformat()
        validated_data["received_time"] = datetime.fromisoformat(received_time)
        return Order.objects.create(**validated_data)