// frontend/src/app/components/add-transaction/add-transaction.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service'; // Adjust path if needed
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators'; // For cleaner component destruction

// Define an interface for the transaction data
interface TransactionPayload {
  type: string; // e.g., 'new_transaction'
  data: {
    description: string;
    amount: number;
  };
}

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  transactionForm: FormGroup;
  private wsStatusSubscription: Subscription | undefined;
  websocketConnected: boolean = false;
  submissionMessage: string = '';
  submissionError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private websocketService: WebsocketService
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d+(\.\d{1,2})?$/)]] // Amount must be positive and up to 2 decimal places
    });
  }

  ngOnInit(): void {
    // Subscribe to WebSocket connection status updates
    // This helps in displaying feedback to the user
    this.wsStatusSubscription = this.websocketService.getMessages()
      .subscribe(message => {
        if (message.type === 'status') {
          this.websocketConnected = message.connected;
          if (!this.websocketConnected) {
            this.submissionMessage = 'WebSocket not connected. Transactions might not be sent.';
            this.submissionError = true;
          } else {
            this.submissionMessage = ''; // Clear status message on connect
            this.submissionError = false;
          }
        }
        // You could also listen for specific backend confirmations here if your backend sends them
        // if (message.type === 'transaction_added_confirmation' && message.data.id) {
        //   this.submissionMessage = `Transaction "${message.data.description}" added successfully!`;
        //   this.submissionError = false;
        //   this.transactionForm.reset();
        // }
      });

    // Ensure WebSocket is connected when the component initializes
    // The `connect` method is idempotent (won't reconnect if already open/connecting)
    // Make sure the URL here matches your backend routing!
    const websocketUrl = 'ws://localhost:8000/ws/transactions/';
    this.websocketService.connect(websocketUrl);
  }

  onSubmit(): void {
    this.submissionMessage = ''; // Clear previous messages
    this.submissionError = false;

    if (this.transactionForm.valid) {
      if (!this.websocketService.isConnected) {
        this.submissionMessage = 'WebSocket not connected. Please wait or check your connection.';
        this.submissionError = true;
        return;
      }

      const { description, amount } = this.transactionForm.value;
      const transactionPayload: TransactionPayload = {
        type: 'new_transaction', // A type for your backend to identify the message
        data: {
          description: description,
          amount: parseFloat(amount) // Ensure amount is a number
        }
      };

      try {
        this.websocketService.sendMessage(transactionPayload);
        this.submissionMessage = 'Transaction sent via WebSocket!';
        this.submissionError = false;
        this.transactionForm.reset(); // Clear the form after sending
        // Mark fields as untouched to clear validation messages after reset
        Object.keys(this.transactionForm.controls).forEach(key => {
          this.transactionForm.controls[key].setErrors(null);
          this.transactionForm.controls[key].markAsUntouched();
        });
      } catch (error) {
        console.error('Error sending transaction:', error);
        this.submissionMessage = 'Failed to send transaction. Check console for details.';
        this.submissionError = true;
      }
    } else {
      this.submissionMessage = 'Please fill out all fields correctly.';
      this.submissionError = true;
      // Mark all fields as touched to display validation messages
      this.markFormGroupTouched(this.transactionForm);
    }
  }

  // Helper to mark all form fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.wsStatusSubscription) {
      this.wsStatusSubscription.unsubscribe();
    }
    // It's generally good practice to close the WebSocket if this is the last component using it
    // Or, if other components use it, manage connection lifecycle in the service itself.
    // For this example, we'll let the service handle its own lifecycle for simplicity,
    // assuming it might be shared across components.
    // If this component were the *only* one initiating/managing the connection, you'd call close() here.
  }
}