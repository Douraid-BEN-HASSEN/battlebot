# countries/serializers.py
from rest_framework import serializers
from .models import Order
from paho.mqtt import client as mqtt_client
import paho.mqtt.client as paho
import paho
from paho import mqtt
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path
import os
import random

dotenv_path = Path('server/server/.env')

load_dotenv(dotenv_path=dotenv_path)

username = os.getenv('HIVE_USERNAME')
password = os.getenv('HIVE_PASSWORD')
host = os.getenv('HIVE_BROKER')
port = int(os.getenv('HIVE_PORT'))


client = mqtt_client.Client()

# client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["topic", "message"]

    def create(self, validated_data):
        received_time = datetime.now().isoformat()
        validated_data["received_time"] = datetime.fromisoformat(received_time)
        order =  Order.objects.create(**validated_data)
        client.connect(host, port)
        client.username_pw_set(username, password)
        client.connect("broker.emqx.io", 1883)
        print("SEND MESSAGE")
        client.publish(order.topic, order.message)
        return order

