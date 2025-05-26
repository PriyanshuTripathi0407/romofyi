from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

Role=[('customer','Customer'),('admin','Admin'),('vendor','Vendor')]


class AppUser(AbstractUser):
    contact= models.CharField(max_length=10)
    address= models.TextField()
    role= models.CharField(max_length=10,choices=Role)
    image= models.ImageField(upload_to='UserImage/')
