"""
URL configuration for ecommerce project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from romofyi.views import * 
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'cart', CartViewSet)  # <-- Register Cart route


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('payments.urls')), 
    # APIView routes
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('register/<id>', RegisterView.as_view()),
    path('customerRegistration/', CustomerRegistrationView.as_view()),
    path('customerRegistration/<id>', CustomerRegistrationView.as_view()),
    path('romouser/', RomoUserRegistrationView.as_view()),
    path('romouser/<id>', RomoUserRegistrationView.as_view()),
    path('vendorRegistration/', VendorRegistrationView.as_view()),
    path('vendorRegistration/<id>', VendorRegistrationView.as_view()),
    path('product/', ProductView.as_view()),
    path('product/<id>', ProductView.as_view()),   
    path('vendor-product/', VendorProductView.as_view()),
    path('user-product/', UserOrderProductView.as_view()),
    path('countries/', CountryList.as_view()),
    path('states/', StateList.as_view()),
    path('cities/', CityList.as_view()),
    path('news/', NewsView.as_view()),
    path('orders/', OrderView.as_view()),  
    path('wishlist/', WishlistProductView.as_view()),
    path('order-items/', OrderItemView.as_view()),
    path('searched-products/', SearchedProductView.as_view()),
    path('cart-item/', CartItemView.as_view()),
    path('contact/', ContactView.as_view()),
    path('comments/', CommentView.as_view()),
    path('viewed-products/', ViewedProductView.as_view()),
    path('register-mail/', RegistrationEmailView.as_view()),
    path('orderplaced-mail/', OrderPlacedEmailView.as_view()),
    path('orderstatus-mail/', OrderStatusEmailView.as_view()),
    # Include router-generated URLs
    path('api/', include(router.urls)),  # <-- This line adds /api/cart/
    path('api/chat/', include('chat.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
