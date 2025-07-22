from rest_framework.views import APIView
from rest_framework import viewsets,status
from rest_framework.response import Response
from romofyi.models import *
from romofyi.Serializers import *
import traceback
# Create your views here. and add in urls.py 
from ecommerce.email import *

from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework.views import APIView
from django.conf import settings  # Make sure your settings are correctly configured for email sending
from django.core.mail import send_mail  # Optional, for simple email sending


#Sending mail for successful Registration View started here
class RegistrationEmailView(APIView):
    def post(self, request):
        to_email = request.data.get('email')
        subject = request.data.get('subject')
        username = request.data.get('username')
        password= request.data.get('password')        
        if not to_email:
            return Response({'error': "Email is required "}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Render the HTML email template
            email_subject = subject if subject else "Welcome to Romofyi"
            email_message = render_to_string('emails/registration.html', {
                'username': username,
                'email': to_email,
                'password': password,  
                'login_url': 'http://localhost:3000/login', 
            })

            # Send the email
            email = EmailMessage(
                subject=email_subject,
                body=email_message,
                from_email='treepathidev04@gmail.com',  # Make sure this is set in settings
                to=[to_email],
            )
            email.content_subtype = "html"  # Set the email as HTML
            email.send()

            return Response({'message': "Email sent successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Sending mail for placing order View started here
class OrderPlacedEmailView(APIView):
    def post(self, request):
        to_email = request.data.get('email')
        subject = request.data.get('subject')
        items = request.data.get('items')
        address = request.data.get('address')        
        date = request.data.get('date')        
        username = request.data.get('username')
        total= request.data.get('total')        
        if not to_email:
            return Response({'error': "Email is required "}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Render the HTML email template
            email_subject = subject if subject else "Welcome to Romofyi"
            email_message = render_to_string('emails/order_placed.html', {
                'username': username,
                'email': to_email,
                'address': address,
                'items': items,
                'grand_total': total,
                'order_date': date,                
            })

            # Send the email
            email = EmailMessage(
                subject=email_subject,
                body=email_message,
                from_email='treepathidev04@gmail.com',  # Make sure this is set in settings
                to=[to_email],
            )
            email.content_subtype = "html"  
            email.send()

            return Response({'message': "Email sent successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#Sending mail for placing order View started here
class OrderStatusEmailView(APIView):
    def post(self, request):
        to_email = request.data.get('email')
        subject = request.data.get('subject')
        items = request.data.get('items')
        address = request.data.get('address')        
        date = request.data.get('date')        
        username = request.data.get('username')
        total= request.data.get('total')        
        if not to_email:
            return Response({'error': "Email is required "}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Render the HTML email template
            email_subject = subject if subject else "Welcome to Romofyi"
            email_message = render_to_string('emails/order_placed.html', {
                'username': username,
                'email': to_email,
                'address': address,
                'items': items,
                'grand_total': total,
                'order_date': date,                
            })

            # Send the email
            email = EmailMessage(
                subject=email_subject,
                body=email_message,
                from_email='treepathidev04@gmail.com',  # Make sure this is set in settings
                to=[to_email],
            )
            email.content_subtype = "html"  
            email.send()

            return Response({'message': "Email sent successfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





#Register View started here``
class RegisterView(APIView): 
    def get(self,request, id=None):
        if id:
            registerData = Registration.objects.get(pk=id)
            serializedData = RegistrationSerializers(registerData)
            return Response(serializedData.data)
        else:
            registerData = Registration.objects.all()
            serializedData = RegistrationSerializers(registerData,many=True)
            return Response(serializedData.data)


    def post(self,request):
        serializeData= RegistrationSerializers(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

    def put(self,request,id= None):
        putData = Registration.objects.get(pk= id)
        serializeData= RegistrationSerializers(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

    def delete(self, request,id= None):
        if id:
            deleteData= Registration.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})

#CustomerRegistration View started here
class RomoUserRegistrationView(APIView):
     def get(self,request, id=None):
        if id:
            registerData = RomoUserRegistration.objects.get(pk=id)
            serializedData = RomoUserRegistrationSerializers(registerData)
            return Response(serializedData.data)
        else:
            registerData = RomoUserRegistration.objects.all()
            serializedData = RomoUserRegistrationSerializers(registerData,many=True)
            return Response(serializedData.data)


     def post(self,request):
        email = request.data.get('email')
        if RomoUserRegistration.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists!'}, status=status.HTTP_400_BAD_REQUEST)

        serializeData= RomoUserRegistrationSerializers(data= request.data)
        if serializeData.is_valid():
            serializeData.save()

            return Response({'data':serializeData.data}, status=status.HTTP_201_CREATED)
        return Response(serializeData.errors, status= status.HTTP_400_BAD_REQUEST)

     def put(self,request,id= None):
        putData = RomoUserRegistration.objects.get(pk= id)
        serializeData= RomoUserRegistrationSerializers(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def delete(self, request,id= None):
        if id:
            deleteData= RomoUserRegistration.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})

#CustomerRegistration View started here
class CustomerRegistrationView(APIView):
     def get(self,request, id=None):
        if id:
            registerData = CustomerRegistration.objects.get(pk=id)
            serializedData = CustomerRegistrationSerializers(registerData)
            return Response(serializedData.data)
        else:
            registerData = CustomerRegistration.objects.all()
            serializedData = CustomerRegistrationSerializers(registerData,many=True)
            return Response(serializedData.data)


     def post(self,request):
        serializeData= CustomerRegistrationSerializers(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def put(self,request,id= None):
        putData = CustomerRegistration.objects.get(pk= id)
        serializeData= CustomerRegistrationSerializers(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def delete(self, request,id= None):
        if id:
            deleteData= CustomerRegistration.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})

#Vendor Registration View started here

class VendorRegistrationView(APIView):
     def get(self,request, id=None):
        if id:
            registerData = VendorRegistration.objects.get(pk=id)
            serializedData = VendorRegistrationSerializers(registerData)
            return Response(serializedData.data)
        else:
            registerData = VendorRegistration.objects.all()
            serializedData = VendorRegistrationSerializers(registerData,many=True)
            return Response(serializedData.data)


     def post(self,request):
        serializeData= VendorRegistrationSerializers(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def put(self,request,id= None):
        putData = VendorRegistration.objects.get(pk= id)
        serializeData= VendorRegistrationSerializers(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def delete(self, request,id= None):
        if id:
            deleteData= VendorRegistration.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})

#This view helps to view the product list of vendor at Vendor Dashboard
class VendorProductView(APIView):
     def get(self,request):
         vendor= request.GET.get('vendor')
         print("This is Vendor ",vendor)
         registerData = Product.objects.filter(vendor=vendor)
         print("This is Vendor Product",registerData)
         serializedData = ProductSerializers(registerData, many=True, context={'request': request})
         print()
         print("This is Vendor Serialized Product",serializedData)
         return Response({'product':serializedData.data}, status=status.HTTP_200_OK)
        

     def post(self,request):
        serializeData= ProductSerializers(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def put(self,request,id= None):
        putData = Product.objects.get(pk= id)
        serializeData= ProductSerializers(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def delete(self, request,id= None):
        if id:
            deleteData= Product.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})



class ProductView(APIView):
     def get(self,request, id=None):
        if id:
            registerData = Product.objects.get(pk=id)
            serializedData = ProductSerializers(registerData, many=True, context={'request': request})
            return Response(serializedData.data)
        else:
            registerData = Product.objects.all()
            serializedData = ProductSerializers(registerData, many=True, context={'request': request})
            return Response(serializedData.data)


     def post(self,request):
        serializeData= ProductSerializers(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def put(self,request,id= None):
        putData = Product.objects.get(pk= id)
        serializeData= ProductSerializers(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def delete(self, request,id= None):
        if id:
            deleteData= Product.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.select_related('customer_id', 'product_id').all()
    serializer_class = CartSerializer


class LoginView(APIView):
    def post(self,request):
        login_email= request.data.get('email')
        print("Registered email in Login ", login_email)
        login_pass= request.data.get('pass')
        print("Registered password in Login ", login_pass)
        login_role= request.data.get('role')
        print("Registered role in Login ", login_role)
    
        
        RegisteredUser = RomoUserRegistration.objects.get(
            email=login_email,
            password=login_pass,
            role=login_role
        )        

        if RegisteredUser: 
            serializedData= RomoUserRegistrationSerializers(RegisteredUser)            
            return Response({'success': True, 'user': serializedData.data }, status=status.HTTP_200_OK)       
        
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class NewsView(APIView):
     def get(self,request, id=None):
        if id:
            registerData = News.objects.get(pk=id)
            serializedData = NewsSerializer(registerData)
            return Response(serializedData.data)
        else:
            registerData = News.objects.all()
            serializedData = NewsSerializer(registerData,many=True)
            return Response(serializedData.data)


     def post(self,request):
        serializeData= NewsSerializer(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def put(self,request,id= None):
        putData = News.objects.get(pk= id)
        serializeData= NewsSerializer(putData, data= request.data, partial= True)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

     def delete(self, request,id= None):
        if id:
            deleteData= News.objects.get(pk=id)
            deleteData.delete()
            return Response({'successfully added'})
        return Response({'message':'Please provide id in url'})
    

class ContactView(APIView):
     def get(self,request, id=None):
        if id:
            registerData = Contact.objects.get(pk=id)
            serializedData = ContactSerializer(registerData)
            return Response(serializedData.data)
        else:
            registerData = Contact.objects.all()
            serializedData = ContactSerializer(registerData,many=True)
            return Response(serializedData.data)


     def post(self,request):
        serializeData= ContactSerializer(data= request.data)
        if serializeData.is_valid():
            serializeData.save()
            return Response(serializeData.data)
        return Response(serializeData.errors)

    


from rest_framework import generics
from .models import Country, State, City
from .Serializers import CountrySerializer, StateSerializer, CitySerializer

class CountryList(generics.ListAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class StateList(generics.ListAPIView):
    serializer_class = StateSerializer

    def get_queryset(self):
        country_id = self.request.query_params.get('country_id')
        return State.objects.filter(country_id=country_id)

class CityList(generics.ListAPIView):
    serializer_class = CitySerializer

    def get_queryset(self):
        state_id = self.request.query_params.get('state_id')
        return City.objects.filter(state_id=state_id)


class ViewedProductView(APIView):
    def get(self, request):
            customer_email = request.GET.get('customer')
            customer = RomoUserRegistration.objects.get(email=customer_email)
            print("Customer in Get ViewedProduct ",customer)                        
            viewed_products = ViewedProduct.objects.filter(customer=customer.id).order_by('-viewed_at').first() 
            print(f"Products Viewed by {customer} in ViewedProduct",viewed_products)                                  
            serializedData = ViewedProductSerializer(viewed_products,context={'request': request})                     
            return Response({'viewed_products':serializedData.data}, status=status.HTTP_200_OK)

    def post(self, request):
        customer_email= request.data.get('customer')
        print("Customer in Post ViewedProduct",customer_email)                        
        product_id= request.data.get('product')
        product = Product.objects.get(product_id= product_id)
        customer= RomoUserRegistration.objects.get(email= customer_email)

        viewed_product = ViewedProduct.objects.create(
            customer=customer,
            product=product,
        )  
        return Response({
            'message': 'Product view tracked successfully!',            
        }, status=status.HTTP_201_CREATED)


class WishlistProductView(APIView):
    def get(self, request):
            customer_email = request.GET.get('customer_email')
            customer = RomoUserRegistration.objects.get(email=customer_email)
            print("Customer in wishlist view ",customer)                        
            wishlisted_products = WishlistProduct.objects.filter(customer=customer.id).order_by('-wished_at') 
            print(f"Products Viewed by {customer} in wishlist view ",wishlisted_products)                        
            
            serializedData = WishlistProductSerializer(wishlisted_products,context={'request': request},many=True)                     
            return Response({'wishlisted_products':serializedData.data}, status=status.HTTP_200_OK)

    def post(self, request):
        customer_email= request.data.get('customer')
        product_id= request.data.get('product')
        product = Product.objects.get(product_id= product_id)
        customer= RomoUserRegistration.objects.get(email= customer_email)

        wishlist_product = WishlistProduct.objects.create(
            customer=customer,
            product=product,
        )

  
        return Response({
            'message': 'Product view tracked successfully!',            
        }, status=status.HTTP_201_CREATED)
  

class SearchedProductView(APIView):
    def get(self, request):
            customer_email = request.GET.get('customer_email')
            customer = RomoUserRegistration.objects.get(email=customer_email)                        
            searched_products = SearchedProduct.objects.filter(customer=customer).order_by('-searched_at').first() 
            serializedData = SearchedProductSerializer(searched_products,context={'request': request})                     
            return Response({'searched_products':serializedData.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        print("This is search request in SearchProductView in Post: ", request.data)
        customer_email= request.data.get('customer')
        product= request.data.get('product')

        product = Product.objects.filter(product_category__name__icontains= product).first()
        customer= RomoUserRegistration.objects.get(email= customer_email)

        searched_product = SearchedProduct.objects.create(
            customer=customer,
            product=product,
        )
  
        return Response({
            'message': 'Product search tracked successfully!',            
        }, status=status.HTTP_201_CREATED)


class CartItemView(APIView):
    def get(self, request):
            customer_email = request.GET.get('customer_email')
            customer = RomoUserRegistration.objects.get(email=customer_email)                        
            cart_products = CartItem.objects.filter(customer=customer).order_by('-added_at').first() 
            serializedData = CartItemSerializer(cart_products,context={'request': request})                     
            return Response({'cart_products':serializedData.data}, status=status.HTTP_200_OK)

    def post(self, request):
        customer_email= request.data.get('customer')
        product_id= request.data.get('product')
        product = Product.objects.get(product_id= product_id)
        customer= RomoUserRegistration.objects.get(email= customer_email)

        cart_product = CartItem.objects.create(
            customer=customer,
            product=product,
            quantity=1
        )

  
        return Response({
            'message': 'Cart Product tracked successfully!',            
        }, status=status.HTTP_201_CREATED)

#This view helps to view the order list at User Dashboard
class OrderView(APIView):
    def get(self, request):
        customer_email = request.GET.get('customer_email')  # Get email from the query params
        customer = RomoUserRegistration.objects.get(email=customer_email)
        
        # Get the orders of the customer
        orders = Order.objects.filter(customer=customer.id).order_by('-created_at')

        # Serialize the orders
        serialized_orders = OrderSerializer(orders, many=True, context={'request': request})

        # Now, for each order, add the comments related to the OrderItem
        for order in serialized_orders.data:
            for item in order.get('items', []):
                order_item = OrderItem.objects.get(id=item['id'])  # Find OrderItem by its id
                comments = Comment.objects.filter(order_item=order_item)  # Get comments for this order item
                
                # Attach comments if they exist, otherwise attach an empty list
                item['comments'] = [comment.comment_text for comment in comments] if comments else []

        return Response({'orders': serialized_orders.data}, status=status.HTTP_200_OK)
    

    def post(self, request):        
        user=RomoUserRegistration.objects.get(pk=request.data.get('customer'))
        session_id= request.data.get('session_id')
        order_data=Order.objects.create(customer=user,session_id=session_id)

        if order_data:
            items = request.data.get('items', [])
            for item in items:
                product_id = item.get('product_id')
                quantity = item.get('count')
                product = Product.objects.get(id=product_id)
                print("Ordered Product in OrderView post method ", product)
                OrderItem.objects.create(
                    order=order_data,
                    product=product,
                    vendor=product.vendor,  # Assuming vendor is related to the product model
                    quantity=quantity
                )
            
            print("Order Details in order post ",order_data.id)
            return Response({
                'message': 'Order placed successfully!',
                'order_id':order_data.id
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'Order placed not successfully!',
            },  status=status.HTTP_400_BAD_REQUEST)

#This view helps to view the order list at Vendor Dashboard
class OrderItemView(APIView):
    def get(self, request):
        vendor= request.GET.get('vendor')
        print("This is Vendor in Order ItemView  ",vendor)
        order_items = OrderItem.objects.filter(vendor=vendor)
        print(f"This is {order_items} by {vendor} ")
        serialized_items = OrderItemSerializer(order_items, many=True, context={'request': request})
        return Response({'order_items': serialized_items.data}, status=status.HTTP_200_OK)

        #This post will done from customer Dashboard
    def post(self, request):        
        customer_email = request.data.get('customer_email')
        order_id = request.data.get('order_id')
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        customer = RomoUserRegistration.objects.get(email=customer_email)
        order = Order.objects.get(id=order_id, customer=customer)
        product = Product.objects.get(id=product_id)
        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity
        )

        return Response({
            'message': 'Order item added successfully!',
            'order_item': OrderItemSerializer(order_item, context={'request': request}).data
        }, status=status.HTTP_201_CREATED)
    


    def patch(self, request):
        item_id = request.data.get('order_item_id')        
        new_status = request.data.get('status')
        print(f"Order Id {item_id} has status: {new_status}")
        try:
            order_item = OrderItem.objects.get(id=item_id)
            order_item.status = new_status
            order_item.save()

            order_item.order.update_status()
            
            vendor= request.data.get('vendor')
            # print("This is Vendor in Order ItemView  ",vendor)
            order_items = OrderItem.objects.filter(vendor=vendor)
            # print(f"This is {order_items} by {vendor} ")           
            return Response({
                'message': 'Order item status updated successfully!',
                'updated_order_item':OrderItemSerializer(order_items, many=True,  context={'request': request}).data
            }, status=status.HTTP_200_OK)
        except OrderItem.DoesNotExist:
            return Response({'error': 'Order item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AddCommentView(APIView):
    def post(self, request):
        customer_email = request.data.get('customer_email')
        order_item_id = request.data.get('order_item_id')  # ID of the product ordered
        rating = request.data.get('rating')  # Rating between 1 to 5
        comment_text = request.data.get('comment_text')  # Text for the comment

        # Fetch customer based on email
        customer = RomoUserRegistration.objects.get(email=customer_email)

        try:
            # Fetch the order item the customer wants to comment on
            order_item = OrderItem.objects.get(id=order_item_id)
            
            if order_item.order.customer != customer:
                return Response({'error': 'You cannot comment on an item not belonging to you.'}, status=status.HTTP_403_FORBIDDEN)

            # Create the comment for the product in the order
            comment = Comment.objects.create(
                customer=customer,
                order_item=order_item,
                rating=rating,
                comment_text=comment_text
            )
            
            return Response({
                'message': 'Comment added successfully!',
                'comment': CommentSerializer(comment).data
            }, status=status.HTTP_201_CREATED)

        except OrderItem.DoesNotExist:
            return Response({'error': 'Order item not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)



class CommentView(APIView):
    def get(self, request):                                            
            comments = Comment.objects.all()
            serializedData = CommentSerializer(comments,context={'request': request})                     
            return Response({'comments':serializedData.data}, status=status.HTTP_200_OK)


    def post(self, request):
        customer= request.data.get('customer_email')
        product= request.data.get('product_id')
        rating= request.data.get('product_rating')
        comment= Comment.objects.create(
            customer= customer,
            product=product,
            rating= rating
        )

        return Response({
            'message': 'Comment added successfully!',            
        }, status=status.HTTP_201_CREATED)



class UserOrderProductView(APIView):
    def get(self, request):
        try:
            customer_id = request.GET.get('customer_id')
            if not customer_id:
                return Response({"error": "customer_id is required"}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = RomoUserRegistration.objects.get(pk=customer_id)
            except RomoUserRegistration.DoesNotExist:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            orders = Order.objects.filter(customer=user)
            if not orders.exists():
                return Response({'orders': []}, status=status.HTTP_200_OK)

            order_items = OrderItem.objects.filter(order__in=orders)
            if not order_items.exists():
                return Response({'orders': []}, status=status.HTTP_200_OK)

            serialized_orders = OrderItemSerializer(order_items, many=True, context={'request': request})
            return Response({'orders': serialized_orders.data}, status=status.HTTP_200_OK)

        except Exception as e:
            print("Error in UserOrderProductView:", str(e))
            traceback.print_exc()
            return Response({"error": "Something went wrong", "details": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


