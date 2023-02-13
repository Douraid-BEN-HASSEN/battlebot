import random
from paho.mqtt import client as mqtt_client
from .mqtthandler import handle
broker = 'broker.emqx.io'
port = 1883
topic = "send_order/"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'
username = 'emqx'
password = 'public'


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        print(f"Received `{msg.payload.decode()}` from `{msg.topic}` topic")
        handle(msg.topic ,msg.payload.decode() )

    client.subscribe(topic)
    client.on_message = on_message

def run_mqtt_listener():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()

