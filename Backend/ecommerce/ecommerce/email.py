from django.core.mail import send_mail
from django.conf import settings

def send_welcome_email(to_email,subject,message):
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [to_email]

    send_mail(subject, message, from_email, recipient_list)