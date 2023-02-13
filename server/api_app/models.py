from django.db import models

EXISTING_STATUS =  [
   ('SUCCESS', 'SUCCESS'),
   ('HOLD', 'HOLD'),
   ('SENT', 'SENT'),
   ('WAITING', 'WAITING'),
]

TOPICS = [
    ('ROBOT_INFORMATION','robot_information/'),
    ('RESPONSE_ORDER','response_order/'),
    ('SEND_ORDER','send_order/')
]

# countries/serializers.py
from paho.mqtt import client as mqtt_client
from dotenv import load_dotenv
from pathlib import Path
import os

dotenv_path = Path('server/server/.env')

load_dotenv(dotenv_path=dotenv_path)

username = os.getenv('HIVE_USERNAME')
password = os.getenv('HIVE_PASSWORD')
host = os.getenv('HIVE_BROKER')
port = int(os.getenv('HIVE_PORT'))

dotenv_path = Path('server/server/.env')

load_dotenv(dotenv_path=dotenv_path)

username = os.getenv('HIVE_USERNAME')
password = os.getenv('HIVE_PASSWORD')
host = os.getenv('HIVE_BROKER')
port = int(os.getenv('HIVE_PORT'))

topics = ["robot_information/", "robot_sensors/", "robot_movements/"]
# generate client ID with pub prefix randomly
username = 'emqx'
password = 'public'


class Order(models.Model):
    received_time = models.DateTimeField(null=True,blank=True)
    sent_time = models.DateTimeField(null=True)
    topic = models.CharField(max_length=128,)# choices = TOPICS,)
    message = models.CharField(max_length=128)
    status = models.CharField(max_length=128 , choices = EXISTING_STATUS,
default = 'WAITING')
    def __str__(self):
        return "ORDER {} : {} on {}".format(self.id  , self.message,self.topic)

    def send(self):
        client = mqtt_client.Client()
        client.connect(host, port)
        client.username_pw_set(username, password)
        client.connect("broker.emqx.io", 1883)
        print("SEND MESSAGE to <{}> , <{}>".format(self.topic,self.message))
        client.publish(self.topic, self.message)


