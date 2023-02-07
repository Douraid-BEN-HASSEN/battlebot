import django_tables2 as tables
from .models import  Order
class SimpleTable(tables.Table):

    class Meta:
        model = Order
        fields = ['received_time', 'sent_time', 'topic', 'message', 'status']
        template_name = "django_tables2/bootstrap.html"