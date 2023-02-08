from django.db import models

EXISTING_STATUS =  [
   ('SUCCESS', 'SUCCESS'),
   ('HOLD', 'HOLD'),
   ('SENT', 'SENT'),
   ('WAITING', 'WAITING'),
]

TOPICS = [
    ('ROBOT_INFORMATION','robot_information/'),
    ('RESPONSE_ORDER','response_order/'),
    ('SEND_ORDER','send_order/')
]

"""When a order 

is created it's on                      HOLD     status 
it has been  correclty send it's on     SENT     status 
the robot sent a response it's on       SUCCESS  status 
"""
class Order(models.Model):
    received_time = models.DateTimeField(null=True,blank=True)
    sent_time = models.DateTimeField(null=True)
    topic = models.CharField(max_length=128,choices = TOPICS,)
    message = models.CharField(max_length=128)
    status = models.CharField(max_length=128 , choices = EXISTING_STATUS,
default = 'WAITING')
    def __str__(self):
        return "ORDER {} : {} on {}".format(self.id  , self.message,self.topic)

