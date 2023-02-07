from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer
import django_tables2 as tables
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import viewsets
from django.shortcuts import render
from .tables import SimpleTable
from django.shortcuts import get_object_or_404, redirect
from django.http import HttpResponseForbidden


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