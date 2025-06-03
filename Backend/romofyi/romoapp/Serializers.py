from rest_framework import serializers
from romoapp.models import *

class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields= '__all__'

    def create(self, validatedData):
        return AppUser.objects.create_user(**validatedData)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields= '__all__'

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model=  Tags
        fields= '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields= '__all__'


