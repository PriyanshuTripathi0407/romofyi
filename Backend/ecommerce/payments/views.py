from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets,status
from romofyi.Serializers import *

# Create your views here.
# payments/views.py

import stripe
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse, HttpResponse
from payments.models import *
from romofyi.models import *
# Replace with your actual test secret key from Stripe
stripe.api_key = "sk_test_51RXFo72eRp4TJiWZf2gQXl2BX51WKSsYvez26vWbCzf4lWQJ4sYkuQocBdETGZJQJC5MuOWu1cS7SvX9Ipl1AdVC00yOBMpSV8"

@csrf_exempt
def create_checkout_session(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body) #to get the list of products from frontend in raw JSON having Key 'item' and converted into a Python dictionary 
            print("This is json Data for create-checkout-session ",data)
            items = data.get("items", []) # to get all products If "items" doesn’t exist (some error in frontend), it defaults to an empty list [] so your server doesn’t crash. 

            line_items = [] # to convert all py dict to Stripe’s expected format

            for item in items:
                    line_items.append({
                    "price_data": {
                    "currency": "inr",  # or 'usd' if you're using dollars
                    "product_data": {
                    "name": item["product_name"],
                    },
                    "unit_amount": int(float(item['product_price']) * 100),  # Stripe needs amount in paisa/cents
                    },
                    "quantity": item.get('count',1),
                    })

            session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=line_items,
            metadata={
                    "user_id": str(data.get("user")), 
                    "order_id": str(data.get("order")),
                    },
            billing_address_collection="required",
            customer_creation="always",
            mode="payment",
            success_url="http://localhost:3000/succesful-payment?session_id={CHECKOUT_SESSION_ID}",  # frontend success URL
            cancel_url="http://localhost:3000/cart",    # frontend cancel URL            
                )
            
            print("Session Id  ",session.id)
          
            return JsonResponse({"id": session.id})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)



class PaymentView(APIView):
    def get(self, request):
        try:
            session_id = request.GET.get('session_id')
            if not session_id:
                return Response({'error': 'Session ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            payment = Payment.objects.get(stripe_session_id=session_id)
            serialized_data = PaymentSerializer(payment, context={'request': request})
            return Response({'payment': serialized_data.data}, status=status.HTTP_200_OK)

        except Payment.DoesNotExist:
            return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            session_id = request.data.get('stripe_session_id')            
            session = stripe.checkout.Session.retrieve(session_id)
       
            if session.payment_status == 'paid':                
                user_id = session.metadata.get("user_id")
                order_id = session.metadata.get("order_id")
                user = RomoUserRegistration.objects.get(id=user_id)
                order = Order.objects.get(id=order_id)             
                order.status = 'orderplaced'
                order.save()                                              
                payment = Payment.objects.create(
                    stripe_session_id=session.id,
                    amount_total=(session.amount_total)/100,
                    user=user,
                    order=order,
                    payment_status=session.payment_status,
                    payment_method= session.payment_method_types
                )
                serializedData= PaymentSerializer(payment, context={'request': request})
                print("After Payment PaymentView Data",serializedData)
                return Response({'message': 'Payment successful','payment': serializedData.data}, status=status.HTTP_201_CREATED)
            else:                
                return Response({'message': 'Payment failed'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(f"Error: {e}")
            return Response({'error': 'Payment not successful'}, status=status.HTTP_400_BAD_REQUEST)
 

class PayView(APIView):
    def post(self, request):
        session_id = request.data.get('session_id')
        session = stripe.checkout.Session.retrieve(session_id)

        return Response({'session':session})





class OrderwithSession(APIView):
    def post(self,request):
        try:
            stripe_session_id = request.data.get('stripe_session_id')
            session = stripe.checkout.Session.retrieve(stripe_session_id)
            order_id = session.metadata.get("order_id")
            order = Order.objects.get(id=order_id)
            order.session_id = stripe_session_id
            order.is_paid= True
            order.save()           
            return Response({'message':'Order is updated with its session ID'}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error':'Order not found'}, status=status.HTTP_404_NOT_FOUND)





from django.conf import settings



@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    endpoint_secret = settings.STRIPE_ENDPOINT_SECRET  # Use your endpoint secret from Stripe

    event = None

    # Verify webhook signature
    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        print("Invalid payload", e)
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        print("Invalid signature", e)
        return HttpResponse(status=400)

    # Handle the session completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        # Extract session details
        stripe_session_id = session.get('id')
        amount_total = session.get('amount_total') / 100  # Amount is in cents, convert to your currency
        customer_email = session.get('customer_email', 'No email provided')  # Default email if missing
        payment_status = session.get('payment_status')  # 'paid', 'pending', etc.
        
        # Optional: If order_id was passed as metadata, retrieve it
        order_id = session.get('metadata', {}).get('order_id')  # Using metadata to track the order
        
        # Log session data for debugging
        print(f"Session ID: {stripe_session_id}, Amount: {amount_total}, Payment Status: {payment_status}, Email: {customer_email}")

        # Handle payment creation or update
        try:
            payment = Payment.objects.create(
                stripe_session_id=stripe_session_id,
                amount_total=amount_total,
                email=customer_email,
                payment_status=payment_status,  # Save payment status
            )

            # If order_id is provided, link the payment with the order
            if order_id:
                try:
                    order = Order.objects.get(id=order_id)  # Assuming order_id is valid
                    order.payment = payment
                    order.is_paid = True  # Update order status to 'paid'
                    order.status = 'orderplaced'  # Set the status based on your workflow
                    order.save()
                    print(f"Order #{order_id} payment linked successfully.")
                except Order.DoesNotExist:
                    print(f"Order with ID {order_id} not found.")
            else:
                print("No order_id found in session metadata.")

        except Exception as e:
            print(f"Error saving payment: {str(e)}")
            return HttpResponse(status=500)

        # Log success
        print(f"Payment for Session {stripe_session_id} completed successfully!")

    return HttpResponse(status=200)


    
@csrf_exempt
def get_payment_details(request):
    data = json.loads(request.body)
    session_id = data.get("session_id")

    try:
        session = stripe.checkout.Session.retrieve(
            session_id,
            expand=["payment_intent", "customer"]  # Expand customer too (optional)
        )
        payment_intent = session.get("payment_intent")

        if not payment_intent:
            return JsonResponse({"error": "Payment intent not found"}, status=400)

        charges = payment_intent.get("charges", {}).get("data", [])
        if not charges:
            return JsonResponse({"error": "No charge found"}, status=400)

        charge = charges[0]
        billing = charge.get("billing_details", {})

        return JsonResponse({
            "customer_name": billing.get("name"),
            "customer_email": billing.get("email"),
            "amount_paid": payment_intent["amount_received"] / 100,
            "currency": payment_intent["currency"],
            "receipt_url": charge.get("receipt_url"),
        })

    except Exception as e:
        print("Stripe Error:", str(e))
        return JsonResponse({"error": str(e)}, status=400)

