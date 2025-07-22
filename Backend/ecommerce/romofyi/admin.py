from django.contrib import admin
from romofyi.models import *

# Register your models here.

# admin.site.register(Registration)
# admin.site.register(CustomerRegistration)
# admin.site.register(Category)
admin.site.register(Tag)                    
# admin.site.register(Product)
admin.site.register(VendorRegistration)
admin.site.register(Cart)
admin.site.register(Country)
admin.site.register(State)
admin.site.register(City)
admin.site.register(Role)
admin.site.register(Contact)

@admin.register(Registration)
class RegistrationModelAdmin(admin.ModelAdmin):
    list_display=['first_name','last_name','contact','email','address','password']

@admin.register(CustomerRegistration)
class CustomerRegistrationModelAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','contact','email','image']
   

@admin.register(RomoUserRegistration)
class RomoUserRegistrationModelAdmin(admin.ModelAdmin):
    list_display=['id','first_name','last_name','contact','email','address','image','role']
   
@admin.register(Category)
class CategoryModelAdmin(admin.ModelAdmin):
    list_display=['name']
   
@admin.register(News)
class NewsModelAdmin(admin.ModelAdmin):
    list_display=['id','headline','tags','description','created_at']

# @admin.register(VendorRegistration)
# class VendorRegistration(admin.ModelAdmin):
#     list_display=['first_name','last_name','address','contact','email','image','shop_name','product_list']

@admin.register(Product)
class ProductModelAdmin(admin.ModelAdmin):
    list_display=['product_id','product_name','vendor','product_category','product_price','short_description']

    def short_description(self, obj):
        return (obj.product_description[:50] + '...') if len(obj.product_description) > 50 else obj.product_description

    short_description.short_description = 'Description'



