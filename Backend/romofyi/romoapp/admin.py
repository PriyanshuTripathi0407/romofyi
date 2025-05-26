from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from romoapp.models import *
# Register your models here.

admin.site.register(Category)
admin.site.register(Tags)

@admin.register(AppUser)
class AppUserModelAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','contact','email','address','role','image','username']

@admin.register(Product)
class ProductModelAdmin(admin.ModelAdmin):
    list_display=['id','product_name','product_id','product_category','product_description','product_oldprice','product_newprice','product_image','product_discount']


