// frontend/src/app/components/transaction-list/transaction-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { Transaction, WebSocketTransactionMessage } from '../../models/transaction.model'; // Import your interfaces

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit, OnDestroy {
  transactions: Transaction[] = []; // Array to hold the list of transactions
  private websocketSubscription: Subscription | undefined;
  websocketConnected: boolean = false;
  errorMessage: string = '';

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    // 1. Establish WebSocket connection (if not already connected by another component)
    // The `connect` method is idempotent, so calling it multiple times is safe.
    const websocketUrl = 'ws://localhost:8000/ws/transactions/';
    this.websocketService.connect(websocketUrl);

    // 2. Subscribe to incoming WebSocket messages
    this.websocketSubscription = this.websocketService.getMessages().subscribe(
      (message: any) => { // Use 'any' initially if type is complex, then refine
        // Handle connection status messages
        if (message.type === 'status') {
          this.websocketConnected = message.connected;
          this.errorMessage = message.error ? 'WebSocket error: ' + message.error : '';
          if (!this.websocketConnected) {
            this.errorMessage = 'WebSocket disconnected. Please check backend server.';
          } else {
            this.errorMessage = ''; // Clear error on successful connect
          }
        }
        // Handle incoming new transaction messages from the backend
        else if (message.type === 'transaction_added_confirmation') { // Match the 'type' your backend sends
          const wsMessage: WebSocketTransactionMessage = message; // Cast to your expected type
          const newTransaction: Transaction = {
            description: wsMessage.data.description,
            amount: wsMessage.data.amount,
            timestamp: new Date() // Add a timestamp for 'Just now' display
          };
          this.transactions.push(newTransaction);
          this.transactions.sort((a, b) => (b.timestamp?.getTime() || 0) - (a.timestamp?.getTime() || 0)); // Sort by newest first
          console.log('New transaction added:', newTransaction);
        }
        // Handle any other message types if needed
        else {
          console.log('Received unhandled WebSocket message:', message);
        }
      },
      (error) => {
        console.error('WebSocket subscription error:', error);
        this.errorMessage = 'WebSocket connection error.';
        this.websocketConnected = false;
      },
      () => {
        console.log('WebSocket subscription completed.');
        this.websocketConnected = false;
        this.errorMessage = 'WebSocket connection closed.';
      }
    );
  }

  // Helper function to format the timestamp
  getTimeDifference(timestamp?: Date): string {
    if (!timestamp) {
      return '';
    }
    const now = new Date();
    const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (seconds < 60) {
      return 'Just now';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  }


  ngOnDestroy(): void {
    if (this.websocketSubscription) {
      this.websocketSubscription.unsubscribe();
    }
    // Decide if you want to close the WebSocket connection here or let the service manage it
    // If other components might use it, let the service manage. If this is the only one, close it.
    // this.websocketService.close();
  }
}