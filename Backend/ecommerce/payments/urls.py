# payments/urls.py

from django.urls import path
from payments.views import *

urlpatterns = [
    path('create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    path('payment-details/', get_payment_details, name="payment-details" ),
    path("payments/", PaymentView.as_view(), name="payment"),
    path("payview/", PayView.as_view(), name="pay"),
    path('order-with-session/', OrderwithSession.as_view()),
]
