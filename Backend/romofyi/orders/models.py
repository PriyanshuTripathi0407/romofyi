from django.db import models

# Create your models here.
# orders/models.py
from django.db import models
from customer.models import Customer
from products.models import Product

Status_Choice=(('pending','Pending'),('shipped','Shipped'), ('delivered','Delivered') )


class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="Pending", choices=Status_Choice)  
    def __str__(self):
        return f"Order #{self.id}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
