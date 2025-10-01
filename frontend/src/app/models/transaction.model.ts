export interface Transaction {
  description: string;
  amount: number;
  timestamp?: Date; // Optional: to store when it was added
}

// This interface matches the payload your backend sends
export interface WebSocketTransactionMessage {
  type: string;
  data: {
    description: string;
    amount: number;
    status: string;
    message: string;
  };
}