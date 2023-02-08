from .models import Order
import subprocess

import django_tables2 as tables
from django.http import HttpResponseForbidden, HttpResponse
from django.shortcuts import get_object_or_404, redirect, render
from rest_framework import viewsets

from .models import Order
from .serializers import OrderSerializer
from .tables import SimpleTable

def index(request):
    return render(request, "main.html")

def order_delete(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if request.method == 'POST':
        order.delete()
        return redirect('order_list')




class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def dispatch(self, request, *args, **kwargs):
        print(request.META['REMOTE_ADDR'])
        # if request.META['REMOTE_ADDR'] != '127.0.0.1' or request.META['REMOTE_ADDR'] !='10.3.2.75' or request.META['REMOTE_ADDR'] !='10.3.2.25':
        #     return HttpResponseForbidden()
        return super().dispatch(request, *args, **kwargs)


class TableView(tables.SingleTableView):
    table_class = SimpleTable
    queryset = Order.objects.all()
    template_name = "orders.html"