from django.contrib import admin
from django.contrib.auth.admin import UserAdmin 
from accounts.models import *
# Register your models here.
# accounts/admin.py



admin.site.register(AppUser)


