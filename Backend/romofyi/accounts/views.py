from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.serializers import *
from rest_framework_simplejwt.exceptions import AuthenticationFailed


def get_tokens_for_user(user):
    if not user.is_active:
        raise AuthenticationFailed(" User is not authenticated ")
    
    refresh= RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }

class RegisterUserView(APIView):
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user= serializer.save()
            token= get_tokens_for_user(user)
            return Response({'token':token, 'messsage':'Your data has been posted successfully !'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
