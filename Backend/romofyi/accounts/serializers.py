from rest_framework import serializers
from accounts.models import *  # adjust import if needed


class RegisterUserSerializer(serializers.ModelSerializer):
    # Common fields
    contact = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    image = serializers.ImageField(write_only=True)

    # Vendor-specific
    shop_name = serializers.CharField(write_only=True, required=False)
    shop_description = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = RomoUser
        fields = [
            'username', 'password', 'email', 'first_name', 'last_name',
            'user_type', 'contact', 'address', 'image',
            'shop_name', 'shop_description',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user_type = validated_data.get('user_type')
        contact = validated_data.pop('contact')
        address = validated_data.pop('address')
        image = validated_data.pop('image')
        shop_name = validated_data.pop('shop_name', None)
        shop_description = validated_data.pop('shop_description', None)

        # Create user
        password = validated_data.pop('password')
        user = RomoUser(**validated_data)
        user.set_password(password)
        user.save()

        # Create role-based profile
        if user_type == 'vendor':
            Vendor.objects.create(
                user=user,
                contact=contact,
                address=address,
                image=image,
                shop_name=shop_name,
                shop_description=shop_description,
            )
        elif user_type == 'customer':
            Customer.objects.create(
                user=user,
                contact=contact,
                address=address,
                image=image,
            )

        return user




from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user_type'] = user.user_type
        token['username'] = user.username
        token['email'] = user.email

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add additional user data to response
        data['user_type'] = self.user.user_type
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['user_id'] = self.user.id

        return data
