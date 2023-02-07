from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import OrderViewSet, TableView , order_delete

router = DefaultRouter()
router.register(r"orders", OrderViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("orders_list/", TableView.as_view() ),
    path('orders/<int:pk>/delete/', order_delete, name='order_delete')
]