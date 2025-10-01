# money_painter_turbo/finance/routing.py
from django.urls import re_path # or path for Django 2.0+

from . import consumers # <--- Make sure this imports your consumers correctly

websocket_urlpatterns = [
    # This regex should EXACTLY match the URL your frontend is trying to connect to
    # 'ws://localhost:8000/ws/transactions/' -> r'ws/transactions/$'
    re_path(r'ws/transactions/$', consumers.TransactionConsumer.as_asgi()), # <--- Matches the frontend URL
    # Add other WebSocket paths here if you have more
]