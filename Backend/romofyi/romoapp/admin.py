from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from romoapp.models import *
# Register your models here.

@admin.register(AppUser)
class AppUserModelAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','contact','email','address','role','image','username']


