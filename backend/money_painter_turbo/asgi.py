# money_painter_turbo/money_painter_turbo/asgi.py
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application

# Import your finance app's routing file
from finance import routing as finance_routing # <--- Ensure this import path is correct

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'money_painter_turbo.settings')

application = ProtocolTypeRouter({
  "http": get_asgi_application(), # Handles standard HTTP requests (Django views)
  "websocket": AuthMiddlewareStack( # Handles WebSocket requests
        URLRouter(
            finance_routing.websocket_urlpatterns # <--- Points to your WebSocket URL patterns
        )
    ),
})