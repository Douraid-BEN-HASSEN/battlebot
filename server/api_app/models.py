from django.db import models

class Order(models.Model):
    received_time = models.DateTimeField()
    sent_time = models.DateTimeField()
    topic = models.CharField()
    message = models.CharField()

