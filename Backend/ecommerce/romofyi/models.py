from django.db import models

import string
# Create your models here and register at admin.py

class Registration(models.Model):
    first_name= models.CharField(max_length=30)
    last_name= models.CharField(max_length=40)
    contact = models.IntegerField()
    email= models.EmailField()
    address = models.TextField()
    password= models.CharField(max_length=20)
    confirm_password = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# -----------------  romofyi models starts here ----------------

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Categories"

class Role(models.Model):
    role_CHOICES = [
        ('cus','Customer'),
        ('admin','Admin'),
        ('ven','Vendor'),        
    ]
    role= models.CharField(max_length=20, choices=role_CHOICES, null=True, blank=True)

    def __str__(self):
        return self.role

class Tag(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Tags"

class VendorRegistration(models.Model):
    first_name= models.CharField(max_length=100,null=True, blank=True)
    last_name= models.CharField(max_length=100,null=True, blank=True)
    shop_name=models.CharField(max_length=200,null=True, blank=True)
    address= models.TextField(null=True, blank=True)
    contact= models.IntegerField(null=True, blank=True)
    email= models.EmailField(null=True, blank=True)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    role= models.ForeignKey(Role,on_delete=models.SET_NULL, null=True, blank=True )
    
    def __str__(self):
        return f"{self.shop_name}"


class RomoUserRegistration(models.Model):
    first_name= models.CharField(max_length=100,null=True, blank=True)
    last_name= models.CharField(max_length=100,null=True, blank=True)
    contact= models.IntegerField(null=True, blank=True)
    email= models.EmailField(null=True, blank=True)
    password= models.CharField(max_length=20,null=True, blank=True)
    confirmpassword= models.CharField(max_length=20,null=True,blank=True)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    favorite_vendor= models.CharField(max_length=100,null=True, blank=True)
    favorite_product= models.CharField(max_length=100,null=True, blank=True)
    role= models.CharField(max_length=100,null=True, blank=True)
    address= models.TextField(null=True, blank=True)
    
   
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Product(models.Model):
    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]

    RATING_CHOICES = [
        (0, "0"),
        (0.5, "0.5"),
        (1, "1"),
        (1.5, "1.5"),
        (2, "2"),
        (2.5, "2.5"),
        (3, "3"),
        (3.5, "3.5"),
        (4, "4"),
        (4.5, "4.5"),
        (5, "5"),
    ]

    product_name = models.CharField(max_length=100)
    product_id = models.CharField(max_length=30, blank=True, null=True)  # Unique product ID
    product_image= models.ImageField(upload_to='product_images/', null=True, blank=True)
    product_category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    product_color = models.CharField(max_length=100, null=True, blank=True)
    product_weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    product_size = models.CharField(max_length=10, choices=SIZE_CHOICES, null=True, blank=True)
    product_tag = models.ManyToManyField(Tag, blank=True)
    product_description = models.TextField(null=True, blank=True)
    product_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    product_rating = models.DecimalField(max_digits=3, decimal_places=1, choices=RATING_CHOICES, default=0.0, null=True)
    vendor = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE, related_name='products', blank=True, null=True)
    is_verified= models.BooleanField(default=False)
    
    def generate_product_id(self):
        # Get the first letter of product_name
        product_name_initial = self.product_name[0].upper() if self.product_name else "N"
        
        # Get the first letter of the product_category
        category_initial = self.product_category.name[0].upper() if self.product_category else "C"
        
        # Get the first letter of the first product tag (if any)
        tag_initial = self.product_tag.first().name[0].upper() if self.product_tag.exists() else "T"
        
        # Get the next available product ID (based on pk, ensuring it's unique)
        product_id_number = f"{self.pk:03d}" if self.pk else "001"  # Padding to 3 digits
        
        # Combine everything to generate the product ID
        return f"{product_name_initial}{category_initial}{tag_initial}{product_id_number}"

    def save(self, *args, **kwargs):
        if not self.pk:  # If the object is being created, not updated
            super(Product, self).save(*args, **kwargs)  # Save first to generate pk
        if not self.product_id:  # Now generate product_id
            self.product_id = self.generate_product_id()
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_name}"

class CustomerRegistration(models.Model):
    first_name= models.CharField(max_length=100,null=True, blank=True)
    last_name= models.CharField(max_length=100,null=True, blank=True)
    contact= models.IntegerField(null=True, blank=True)
    email= models.EmailField(null=True, blank=True)
    password= models.CharField(max_length=20,null=True, blank=True)
    confirmpassword= models.CharField(max_length=20,null=True,blank=True)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    favorite_vendors = models.ManyToManyField(VendorRegistration, blank=True)
    favorite_products = models.ManyToManyField(Product, blank=True)
    role= models.ForeignKey(Role,on_delete=models.SET_NULL, null=True, blank=True )
    
    # ordered_product=models.cha

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Cart(models.Model):
    customer_id= models.ForeignKey(CustomerRegistration, on_delete= models.CASCADE)
    product_id= models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product_id} {self.customer_id}"

# -----------------  romofyi models ends here ----------------

class UserLogin(models.Model):
    email= models.CharField(max_length=100)
    password= models.CharField(max_length=20)
    role= models.CharField(max_length=30)


class Country(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class State(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, related_name='states', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.ForeignKey(State, related_name='cities', on_delete=models.CASCADE)

    def __str__(self):
        return self.name



class News(models.Model):
    headline= models.CharField(max_length=500)
    tags= models.CharField(max_length=100)
    image= models.ImageField(upload_to='product_images/', null=True, blank=True)
    description= models.TextField()
    created_at= models.DateTimeField(auto_now=True, null=True ,blank=True)


class Contact(models.Model):
    first_name= models.CharField(max_length=100)
    last_name= models.CharField(max_length=100)
    email= models.EmailField()
    contact= models.CharField(max_length=10)
    message= models.TextField()
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class ViewedProduct(models.Model):
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    viewed_at = models.DateTimeField(auto_now_add=True)


class WishlistProduct(models.Model):
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    wished_at = models.DateTimeField(auto_now_add=True)


class SearchedProduct(models.Model):
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE,null=True ,blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE,null=True ,blank=True)
    searched_at = models.DateTimeField(auto_now_add=True,null=True ,blank=True)

class CartItem(models.Model):
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)      

class Order(models.Model):
    STATUS_CHOICES= (('pending', 'Pending'),('orderplaced','OrderPlaced'),('delivered','Delivered'),('shipped','Shipped'))
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    status = models.CharField(max_length=30, default="pending", choices=STATUS_CHOICES) 
    session_id= models.CharField(max_length=255, null=True, blank=True)

    def update_status(self):
        # Check if all items are delivered
        if all(item.status == 'delivered' for item in self.items.all()):
            self.status = 'delivered'
        elif any(item.status == 'shipped' for item in self.items.all()):
            self.status = 'shipped'
        else:
            self.status = 'orderplaced'
        self.save()

    def __str__(self):
        return f"Order {self.id} - {self.status}"

class OrderItem(models.Model):
    STATUS_CHOICES = (
        ('orderplaced', 'Order Placed'),
        ('packed', 'Packed'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('returned', 'Returned'),
    )
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    vendor= models.ForeignKey(RomoUserRegistration,on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField()  
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='orderplaced')

    def __str__(self):
        return f"Order {self.id} {self.product.product_name} - {self.status}"
    
class Comment(models.Model):
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE,null=True, blank=True)
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE,null=True, blank=True)  # Link to OrderItem
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    comment_text = models.TextField(null=True, blank=True)  # Add a text field for the comment
    commented_at = models.DateTimeField(auto_now_add=True)


class ProductReview(models.Model):
    customer = models.ForeignKey(RomoUserRegistration, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

