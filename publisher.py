import random
import time
import json
from paho.mqtt import client as mqtt_client
import paho.mqtt.client as paho
import paho
from paho import mqtt

broker = 'beeb3ef0279e4d86985afe740d185f1c.s2.eu.hivemq.cloud'
port = 8883
topic = "robot"
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 1000)}'


username = 'MPbs7eXCKby8HFC'
password = 'FHNkH2LyRStfWlq'

MQTT_MSG=json.dumps({"id": 3,
             "order_id":  3})

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
    client.connect(broker, port)
    return client


def publish(client):
    msg_count = 0
    while True:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(topic, MQTT_MSG)
        # result: [0, 1]
        status = result[0]
        if status == 0:
            print(f"Send `{MQTT_MSG}` to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == '__main__':
    run()