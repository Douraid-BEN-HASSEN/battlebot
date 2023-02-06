from django.db import models

EXISTING_STATUS =  [
   ('SUCCESS', 'SUCCESS'),
   ('HOLD', 'HOLD'),
   ('SENT', 'SENT'),
   ('WAITING', 'WAITING'),
]

"""When a order 

is created it's on                      HOLD     status 
it has been  correclty send it's on     SENT     status 
the robot sent a response it's on       SUCCESS  status 
"""
class Order(models.Model):
    received_time = models.DateTimeField()
    sent_time = models.DateTimeField()
    topic = models.CharField(max_length=128)
    message = models.CharField(max_length=128)
    status = models.CharField(max_length=128 , choices = EXISTING_STATUS,
default = 'WAITING')

