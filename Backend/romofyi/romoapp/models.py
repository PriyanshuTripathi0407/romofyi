from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

Role=[('customer','Customer'),('admin','Admin'),('vendor','Vendor')]


class AppUser(AbstractUser):
    contact= models.CharField(max_length=10)
    address= models.TextField()
    role= models.CharField(max_length=10,choices=Role)
    image= models.ImageField(upload_to='UserImage/')
    shop_name=models.CharField(max_length=150, null=True,blank=True)

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"
    
    class Meta:
        verbose_name_plural = "Categories"

class Tags(models.Model):
    name= models.CharField(max_length=20,null=True,blank=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    SIZE_CHOICES = [
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
    ]
    WEIGHT_CHOICES = [
        ('75g', '75g'),
        ('50g', '50g'),
        ('100g', '100g'),
        ('200g', '200g'),
        ('500g', '500g'),
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
    COLOR_CHOICES = [('RED', 'Red'),('BLU', 'Blue'),('GRN', 'Green'),
                     ('BLK', 'Black'),('WHT', 'White'),('YEL', 'Yellow'),
                     ('ORG', 'Orange'),('PNK', 'Pink'),('PRP', 'Purple'),
                     ('BRN', 'Brown'),     ('GRY', 'Gray'),    ('GLD', 'Gold'), ]


    product_name = models.CharField(max_length=100)
    product_id = models.CharField(max_length=30, blank=True, null=True)  # Unique product ID
    product_image= models.ImageField(upload_to='product_images/', null=True, blank=True)
    product_category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    product_color = models.CharField(max_length=100, null=True, blank=True, choices=COLOR_CHOICES)
    product_weight = models.CharField(max_length=10, choices=WEIGHT_CHOICES ,null=True, blank=True)
    product_size = models.CharField(max_length=10, choices=SIZE_CHOICES, null=True, blank=True)
    product_tag = models.ForeignKey(Tags,blank=True, null=True, on_delete= models.SET_NULL)
    product_description = models.TextField(null=True, blank=True)
    product_oldprice = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    product_newprice = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    product_vendor= models.ForeignKey(AppUser, on_delete=models.CASCADE, limit_choices_to={'role': 'vendor'},null=True, blank=True)
    product_rating = models.DecimalField(max_digits=3, decimal_places=1, choices=RATING_CHOICES, default=0.0, null=True)
    product_isStock= models.BooleanField(default=True,null=True, blank=True)
    product_discount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def generate_product_id(self):
        # Get the first letter of product_name
        product_name_initial = self.product_name[0].upper() if self.product_name else "N"
        
        # Get the first letter of the product_category
        category_initial = self.product_category.name[0].upper() if self.product_category else "C"
        # Get the next available product ID (based on pk, ensuring it's unique)
        product_id_number = f"{self.pk:03d}" if self.pk else "001"  # Padding to 3 digits
        
        # Combine everything to generate the product ID
        return f"{product_name_initial}{category_initial}{product_id_number}"

    def generate_discount(self):
        if self.product_oldprice and self.product_newprice:          
                discount = (self.product_oldprice - self.product_newprice) 
                self.product_discount = discount           
        else:
            self.product_discount = None
    
    def save(self, *args, **kwargs):
        self.generate_discount()
        if not self.pk:  # If the object is being created, not updated
            super(Product, self).save(*args, **kwargs)  # Save first to generate pk
        if not self.product_id:  # Now generate product_id
            self.product_id = self.generate_product_id()

        # Auto-calculate discount if prices are present

        super(Product, self).save(*args, **kwargs)
        # super().save(*args, **kwargs) 


    def __str__(self):
        return f"{self.product_name}"



