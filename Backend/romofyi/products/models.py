# Create your models here.
# products/models.py
from django.db import models
from vendor.models import Vendor

class Product(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    tag= models.CharField(max_length=50)
    image = models.ImageField(upload_to='Images/')
    stock = models.IntegerField()
    category = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

