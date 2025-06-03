from django.shortcuts import render
from romoapp.Serializers import *
from romoapp.models import *
from rest_framework.views import APIView
from rest_framework import viewsets,status
from rest_framework.response import Response

# Create your views here.

class AppUserView(APIView):
    def get(self,request,pk=None):
        if pk:
            registeredData= AppUser.objects.get(pk=pk)
            serializedData= AppUserSerializer(registeredData)
            return Response(serializedData.data)
        else:
            registeredData= AppUser.objects.all()
            serializedData= AppUserSerializer(registeredData, many=True)
            return Response(serializedData.data)
        
    def post(self,request):
        postedData= request.data
        serializedData= AppUserSerializer(data=postedData)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors)
    
    def put(self,request,pk=None):
        oldData= AppUser.objects.get(pk=pk)
        newData= request.data
        serializedData= AppUserSerializer(oldData,newData)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors)

    def delete(self,request,pk=None):
        if pk:
            registeredData= AppUser.objects.get(pk=pk)
            registeredData.delete()
            return Response({'Successfully Deleted Data'})
        else:
            return Response({'message':'Please provide primary key'})
        

class ProductView(APIView):
    def get(self, request, pk=None):
        if pk:
            registeredData= Product.objects.get(pk=pk)
            serializedData= ProductSerializer(registeredData)
            return Response(serializedData.data)
        else:
            registeredData= Product.objects.all()
            serializedData= ProductSerializer(registeredData, many=True)
            return Response(serializedData.data)
        
    def post(self, request):
        postData= request.data
        serializedData= ProductSerializer(data= postData)
        if serializedData.is_valid():
            serializedData.save()
            return Response(serializedData.data)
        return Response(serializedData.errors)
    
    def put(self, request, pk=None):
        if pk:
            oldData= Product.objects.get(pk=pk)
            newData= request.data
            serializedData= ProductSerializer(oldData,newData,partial=True)
            if serializedData.is_valid():
                serializedData.save()
                return Response({'Data is posted successfully'})
            return Response(serializedData.errors)
        else:
            return Response({'message':'Please provide primary key'})
            


    def delete(self, request,pk=None):
        if pk:
            registeredData= Product.objects.get(pk=pk)
            registeredData.delete()
            return Response({'message':'Data is deleted successfully'})
        else:
            return Response({'message':'Please provide primary key'})
        




