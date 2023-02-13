import random
from paho.mqtt import client as mqtt_client
from .mqtthandler import handle
import paho.mqtt.client as paho
import paho
from paho import mqtt
import os
from dotenv import load_dotenv
from pathlib import Path


dotenv_path = Path('server/server/.env')

load_dotenv(dotenv_path=dotenv_path)

broker = 'broker.emqx.io'
port = 1883

username = os.getenv('HIVE_USERNAME')
password = os.getenv('HIVE_PASSWORD')
host = os.getenv('HIVE_BROKER')
port = int(os.getenv('HIVE_PORT'))

MQTT_TOPIC = [("robot_information/",0),("response_order/",0),("send_order/",0)]


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id="", userdata=None,)# protocol=paho.MQTTv5)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    # enable TLS for secure connection
    client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
    # set username and password
    client.username_pw_set(username,password)
    # connect to HiveMQ Cloud on port 8883 (default for MQTT)
    client.connect(host, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        # print("CLIENT ID ",msg.payload.decode())
        handle(msg.topic ,msg.payload.decode() )

    client.subscribe(MQTT_TOPIC)
    client.on_message = on_message

def run_mqtt_listener():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()

