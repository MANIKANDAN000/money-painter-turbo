from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def index(request):
    return HttpResponse("Welcome to Money Painter Turbo Django backend!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/finance/', include('finance.urls')),          # For finance app
    path('api/transactions/', include('transactions.urls')), # For transactions app
    path('', index),  # Root route
]
