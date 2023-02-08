from django.shortcuts import get_object_or_404
from .models import Order
import json

def handle(topic , message):
    # ....
    try :
        message = json.loads(message)
    except :
        pass
    if topic=="robot_information/":
        # the robot send his information and the backend send it to the front end to show the robot information
        pass
    if topic =="response_order/":
        # a response to the order ( if it has been executed or not )
        try:
            print("MESSAGE ", message)
            #Order has been correctly executed
            order_id = message.get("order_id")
            order = Order.objects.get(pk=order_id)
            if order.status=="WAITING":
                order.status="SUCCESS"
                order.save()
            print("Order {} sent on status {}".format(order, order.status))

        except Exception as e :
            print(e)
            pass
    if topic=="/send_order":
        pass