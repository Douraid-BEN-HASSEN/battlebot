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

def order_delete(request, pk):
    order = get_object_or_404(Order, pk=pk)
    if request.method == 'POST':
        order.delete()
        return redirect('order_list')

class OrdersAPI(APIView):
    def get(self, request):
        books = Order.objects.all()
        serializer = OrderSerializer(books, many=True)

        """return JsonResponse({
            "orders": serializer.data
        }, safe=False)"""

        return Response(serializer.data, status=status.HTTP_200_OK)



    def post(self, request):
        topic = request.data.get("topic")
        message = request.data.get("message")
        data ={
            "topic":topic,
            "message":message
        }
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.error_messages, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_400_BAD_REQUEST)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()


class TableView(tables.SingleTableView):
    table_class = SimpleTable
    queryset = Order.objects.all()
    template_name = "orders.html"