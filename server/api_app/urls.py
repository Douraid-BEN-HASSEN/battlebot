from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import OrderViewSet, TableView , order_delete, index

router = DefaultRouter()
router.register(r"send_orders", OrderViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    # path("send_orders/", OrderViewSet.as_view(), name="send_orders"),
    path("",index,name="index"),
    path("orders_list/", TableView.as_view() ,name = "table"),
    path('orders/<int:pk>/delete/', order_delete, name='order_delete')
]