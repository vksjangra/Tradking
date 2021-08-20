from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import ForeignKey, CharField, DecimalField, IntegerField, BooleanField

class User(AbstractUser):
    pass

# Create your models here.

class Trade(models.Model):
    user = ForeignKey(User, on_delete=models.CASCADE)
    stock_name = CharField(max_length=512)
    entry = DecimalField(max_digits=128, decimal_places=3)
    quantity = IntegerField()
    target = DecimalField(max_digits=128, decimal_places=3)
    stoploss = DecimalField(max_digits=128, decimal_places=3)
    profit = BooleanField(null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
