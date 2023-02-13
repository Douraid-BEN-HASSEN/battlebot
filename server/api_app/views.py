import django_tables2 as tables
from django.http import HttpResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect
from rest_framework import viewsets

from .models import Order
from .serializers import OrderSerializer
from .tables import SimpleTable


from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse




@csrf_exempt
def send_orders_view(request):
    print("METHOD :", request.method, "FROM {}".format(request.META['REMOTE_ADDR']))
    print(request.POST)
    if request.method =="POST":
        topic = request.POST['topic']
        message = request.POST['message']
        order = Order(message = message , topic = topic)
        order.save()
        order.send()
        return HttpResponse(201)
    else :
        response = JsonResponse({'message': 'Success'})
        return HttpResponse(200)
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def dispatch(self, request, *args, **kwargs):
        print("CALLED WITH ",request.method)
        print(request.META['REMOTE_ADDR'])
        # if request.META['REMOTE_ADDR'] != '127.0.0.1' or request.META['REMOTE_ADDR'] !='10.3.2.75' or request.META['REMOTE_ADDR'] !='10.3.2.25':
        #     return HttpResponseForbidden()
        return super().dispatch(request, *args, **kwargs)


class TableView(tables.SingleTableView):
    table_class = SimpleTable
    queryset = Order.objects.all()
    template_name = "orders.html"