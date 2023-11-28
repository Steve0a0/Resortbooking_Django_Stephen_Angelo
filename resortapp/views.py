from django.shortcuts import render
from .models import *
from django.shortcuts import redirect,get_object_or_404
from django.core.mail import send_mail
from django.http import JsonResponse


def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        contactpage = ContactMessage(contact_name=name, contact_email=email, contact_number=phone, contact_subject=subject, contact_message=message)
        contactpage.save()

        # Send an email
        
        email_message = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nSubject: {subject}\nMessage: {message}"
        send_mail(
             f'New contact from {name}',
            email_message,
            'stephenangelo4@gmail.com',  # Replace with your email
            ['stephenangeloirl@gmail.com'],  # Replace with your admin's email
            fail_silently=False,
        )

        return JsonResponse({'message': 'Your message has been sent.'})

    return JsonResponse({'message': 'Invalid request'})
# Create your views here.

def homepage(request):
    Hoteldetails=Hotel.objects.all()
    
    context={
        'Hoteldetails':Hoteldetails
    }
    return render(request,'home.html',context)

def details(request,pk):
    Hoteldetails=get_object_or_404(Hotel, pk=pk)
    context={
        'Hoteldetails':Hoteldetails
    }
    return render (request, "details.html", context)

def detailspage(request):
    Hoteldetails=Hotel.objects.all()
    
    context={
        'Hoteldetails':Hoteldetails
    }
    return render(request,'details.html',context)
