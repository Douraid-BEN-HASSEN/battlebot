# countries/serializers.py
from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [  # "received_time",
                    # "sent_time",
                    "topic",
                    "message",
                    # "status"
                    ]