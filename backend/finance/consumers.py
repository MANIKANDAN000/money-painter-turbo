# money_painter_turbo/finance/consumers.py
import json
from channels.generic.websocket import WebsocketConsumer

class TransactionConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print(f"WebSocket Connected to TransactionConsumer!")

    def disconnect(self, close_code):
        print(f"WebSocket Disconnected from TransactionConsumer: {close_code}")

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')
        message_data = text_data_json.get('data')

        print(f"Received message type: {message_type}, data: {message_data}")

        if message_type == 'new_transaction':
            description = message_data.get('description', 'N/A')
            amount = message_data.get('amount', 0.0)

            print(f"Processing NEW TRANSACTION: Description='{description}', Amount={amount}")

            # Here you would typically save the transaction to your database.
            # For demonstration, we'll just send a confirmation back.
            # In a real app, you might save, then fetch the saved object (with an ID, timestamp, etc.)
            # and send that complete object to all connected clients.

            # Send a confirmation/update back to the client that sent the message
            self.send(text_data=json.dumps({
                'type': 'transaction_added_confirmation', # This type is caught by frontend
                'data': {
                    'description': description,
                    'amount': amount,
                    'status': 'success',
                    'message': 'Transaction received by server!'
                }
            }))

            # If you want to broadcast this to ALL connected clients (e.g., for a live update across multiple users)
            # you would use channel layers (requires Redis or similar backend for production)
            # from asgiref.sync import async_to_sync
            # async_to_sync(self.channel_layer.group_send)(
            #     "transactions_group", # The group name
            #     {
            #         "type": "transaction_update", # A method in this consumer will handle this type
            #         "message": {
            #             'description': description,
            #             'amount': amount,
            #             'id': 'some_generated_id', # If you had a database ID
            #             'timestamp': 'current_iso_time_string' # If you want server-generated time
            #         }
            #     }
            # )
        else:
            self.send(text_data=json.dumps({
                'type': 'error',
                'data': {
                    'message': 'Unknown message type received.'
                }
            }))

    # Example method to handle messages sent to the group (uncomment if using channel layers)
    # def transaction_update(self, event):
    #     message = event['message']
    #     # Send the message to the WebSocket
    #     self.send(text_data=json.dumps({
    #         'type': 'transaction_update',
    #         'data': message
    #     }))