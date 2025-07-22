from rest_framework import serializers
from romofyi.models import *

#create your serializer and use it in views.py
class RegistrationSerializers(serializers.ModelSerializer):
    class Meta:   #default keyword
        model = Registration # converting user defined model to python
        fields = '__all__' # extracting required fields
    
class CategorySerializers(serializers.ModelSerializer):
    class Meta:   #default keyword
        model = Category # converting user defined model to python
        fields = '__all__' # extracting required fields
    
class TagSerializers(serializers.ModelSerializer):
    class Meta:   #default keyword
        model = Tag # converting user defined model to python
        fields = ['id', 'name'] # extracting required fields
    
class CustomerRegistrationSerializers(serializers.ModelSerializer):
    class Meta:   #default keyword
        model = CustomerRegistration # converting user defined model to python
        fields = '__all__' # extracting required fields
    
class VendorRegistrationSerializers(serializers.ModelSerializer):
    class Meta:   #default keyword
        model = VendorRegistration # converting user defined model to python
        fields = '__all__' # extracting required fields

class RomoUserRegistrationSerializers(serializers.ModelSerializer):
    class Meta:   #default keyword
        model = RomoUserRegistration # converting user defined model to python
        fields = '__all__' # extracting required fields
    

    
class ProductSerializers(serializers.ModelSerializer):
    product_tag = TagSerializers(many=True)
    product_image = serializers.SerializerMethodField()
    product_category = CategorySerializers(read_only=True)
    vendor= RomoUserRegistrationSerializers(read_only= True)

    def get_product_image(self, obj):
        request = self.context.get('request')
        if obj.product_image and request:
            return request.build_absolute_uri(obj.product_image.url)
        return None

    class Meta:   #default keyword
        model = Product # converting user defined model to python
        fields = '__all__' # extracting required fields
 

class CartSerializer(serializers.ModelSerializer):
    product_id = ProductSerializers(read_only=True)
    customer_id = CustomerRegistrationSerializers(read_only=True)

    class Meta:
        model = Cart
        fields = '__all__'

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserLogin
        fields= '__all__'


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model=  News
        fields= '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model=  Contact
        fields= '__all__'



#country serializers 
from rest_framework import serializers
from .models import Country, State, City

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']

class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = State
        fields = ['id', 'name']

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name']





class ViewedProductSerializer(serializers.ModelSerializer):
    customer = RomoUserRegistrationSerializers()
    product = ProductSerializers()

    class Meta:
        model = ViewedProduct
        fields = ['id', 'viewed_at', 'customer', 'product']


class WishlistProductSerializer(serializers.ModelSerializer):
    customer = RomoUserRegistrationSerializers()
    product = ProductSerializers()

    class Meta:
        model = WishlistProduct
        fields = ['id', 'wished_at', 'customer', 'product']

class SearchedProductSerializer(serializers.ModelSerializer):
    customer = RomoUserRegistrationSerializers()
    product = ProductSerializers()

    class Meta:
        model = SearchedProduct
        fields = ['id', 'searched_at', 'customer', 'product']


class CartItemSerializer(serializers.ModelSerializer):
    customer = RomoUserRegistrationSerializers()
    product = ProductSerializers()  

    class Meta:
        model = CartItem
        fields = ['id','added_at','quantity','customer','product']

class OrderSerializer(serializers.ModelSerializer):
    customer = RomoUserRegistrationSerializers()
    
    class Meta:
        model = Order
        fields = ['id','customer','created_at','is_paid','status']


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializers()
    order = OrderSerializer()
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    status_choices = serializers.SerializerMethodField()
    # vendor= RomoUserRegistrationSerializers()
    class Meta:
        model = OrderItem
        fields = ['id', 'quantity', 'product', 'order', 'status', 'status_display', 'status_choices']

    def get_status_choices(self, obj):
        return OrderItem.STATUS_CHOICES


class CommentSerializer(serializers.ModelSerializer):
    customer = RomoUserRegistrationSerializers()
    order_item = OrderItemSerializer()

    class Meta:
        model = Comment
        fields = ('id', 'customer', 'order_item', 'rating', 'comment_text', 'commented_at')


from payments.models import *

class PaymentSerializer(serializers.ModelSerializer):
    user = RomoUserRegistrationSerializers()
    order = OrderSerializer()

    class Meta:
        model = Payment
        fields = ('id','order','user', 'payment_method','stripe_session_id', 'amount_total', 'payment_status', 'created_at')



