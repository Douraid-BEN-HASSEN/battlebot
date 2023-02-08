from django.core.management.base import BaseCommand
import threading
from api_app.mqttlistener import  run_mqtt_listener
import sys
class Command(BaseCommand):
    help = "Starts the MQTT listener thread"

    def handle(self, *args, **options):
        mqtt_thread = threading.Thread(target=run_mqtt_listener)
        mqtt_thread.start()
        while True:
            try:
                char = sys.stdin.read(1)
                if char.upper() == "a":
                    mqtt_thread._stop()
                    break
            except:
                break
        sys.exit()