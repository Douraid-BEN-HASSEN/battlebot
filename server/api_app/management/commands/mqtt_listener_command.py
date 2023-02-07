from django.core.management.base import BaseCommand
import threading
from api_app.mqttlistener import  run_mqtt_listener
import sys
class Command(BaseCommand):
    help = "Starts the MQTT listener thread"

    def handle(self, *args, **options):
        mqtt_thread = threading.Thread(target=run_mqtt_listener)
        mqtt_thread.start()
        try:
            mqtt_thread.join()
        except KeyboardInterrupt:
            self.stdout.write(self.style.WARNING("Mqtt Listener stopped"))
            sys.exit()