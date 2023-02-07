from .models import Order
import subprocess

import django_tables2 as tables
from django.http import HttpResponseForbidden, HttpResponse
from django.shortcuts import get_object_or_404, redirect
from rest_framework import viewsets

from .models import Order
from .serializers import OrderSerializer
from .tables import SimpleTable


def start_mqtt_listener():
    subprocess.Popen(["python", "mqttlistener.py"])
    return HttpResponse("MQTT listener started")


start_mqtt_listener()
def order_delete(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if request.method == 'POST':
        order.delete()
        return redirect('order_list')




class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def dispatch(self, request, *args, **kwargs):
        if request.META['REMOTE_ADDR'] != '127.0.0.1':
            return HttpResponseForbidden()
        return super().dispatch(request, *args, **kwargs)


class TableView(tables.SingleTableView):
    table_class = SimpleTable
    queryset = Order.objects.all()
    template_name = "orders.html"