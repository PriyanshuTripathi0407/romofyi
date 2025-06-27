from django.db import models

# Create your models here.
# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class RomoUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('vendor', 'Vendor'),
        ('customer', 'Customer'),
    )
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES)    


class Vendor(models.Model):
    user= models.OneToOneField(RomoUser, on_delete=models.CASCADE)   
    contact= models.CharField(max_length=10)
    image = models.ImageField(upload_to='User_images/')
    address= models.TextField()
    shop_name= models.CharField(max_length=200)
    shop_description= models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"

class Customer(models.Model):
    user= models.OneToOneField(RomoUser, on_delete=models.CASCADE)    
    contact= models.CharField(max_length=10)
    image = models.ImageField(upload_to='User_images/')
    address= models.TextField()   

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.email}"



