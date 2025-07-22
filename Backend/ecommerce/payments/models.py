from django.db import models
from romofyi.models import RomoUserRegistration,Order
# Create your models here.
from django.db import models

class Payment(models.Model):
    stripe_session_id = models.CharField(max_length=255, unique=True)
    amount_total = models.IntegerField()  # in paisa (₹ * 100)
    user=models.ForeignKey(RomoUserRegistration,on_delete=models.CASCADE, blank=True, null=True)
    order=models.ForeignKey(Order,on_delete=models.CASCADE, blank=True, null=True)
    payment_status = models.CharField(max_length=50,default='unpaid')
    payment_method= models.CharField(max_length=80,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def update_payment_status(self,request):
        self.payment_status = 'success'
        self.save()
                                                                                              
    def __str__(self):
        return f"Payment {self.stripe_session_id} - ₹{self.amount_total / 100} - {self.payment_status}"
