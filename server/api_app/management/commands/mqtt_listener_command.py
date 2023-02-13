import random
import paho.mqtt.client as mqtt

# MQTT broker and connection settings
broker = 'broker.emqx.io'
port = 1883
topics = ["robot_information/", "robot_sensors/", "robot_movements/"]
# generate client ID with pub prefix randomly
client_id = f'python-mqtt-{random.randint(0, 100)}'
username = 'emqx'
password = 'public'

# MQTT client callback functions
def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))
    # Subscribing to multiple topics
    for topic in topics:
        client.subscribe(topic)

def on_message(client, userdata, msg):
    print("Topic: ", msg.topic + "\nMessage: " + str(msg.payload))

# Create MQTT client and connect to broker
client = mqtt.Client(client_id)
client.username_pw_set(username, password)
client.on_connect = on_connect
client.on_message = on_message

client.connect(broker, port, 60)

# Start MQTT client loop to listen for messages
client.loop_forever()