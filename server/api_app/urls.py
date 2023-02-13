from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.generic import TemplateView
from .views import OrderViewSet, TableView ,send_orders_view

router = DefaultRouter()
router.register(r"send_orders", OrderViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("api/test/",send_orders_view),
    # path("orders_list/", TableView.as_view() ,name = "table"),
]