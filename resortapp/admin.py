from django.contrib import admin
from .models import Hotel,HotelImage,ContactMessage,Amenity
# Register your models here.

admin.site.register(HotelImage),
admin.site.register(Hotel),
admin.site.register(ContactMessage),
admin.site.register(Amenity),
