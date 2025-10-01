// frontend/src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private websocket: WebSocket | undefined;
  private messageSubject: Subject<any> = new Subject<any>();
  public isConnected: boolean = false; // Add a status property

  constructor() { }

  public connect(url: string): void {
    if (this.websocket && (this.websocket.readyState === WebSocket.OPEN || this.websocket.readyState === WebSocket.CONNECTING)) {
      console.log('WebSocket already connected or connecting.');
      return;
    }

    this.websocket = new WebSocket(url);

    this.websocket.onopen = (event) => {
      console.log('WebSocket connection opened:', event);
      this.isConnected = true;
      // You might want to emit a connected status here or use the subject
      this.messageSubject.next({ type: 'status', connected: true });
    };

    this.websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.messageSubject.next(data); // Emit received data
      } catch (e) {
        console.error('Failed to parse WebSocket message:', e, event.data);
      }
    };

    this.websocket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
      this.isConnected = false;
      this.messageSubject.next({ type: 'status', connected: false });
      this.websocket = undefined; // Clear for potential reconnection
      // Implement reconnection logic here if desired
    };

    this.websocket.onerror = (event) => {
      console.error('WebSocket error:', event);
      this.isConnected = false;
      this.messageSubject.next({ type: 'status', connected: false, error: event });
      // Handle error, maybe attempt to reconnect
    };
  }

  public sendMessage(message: any): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected or not open. Message not sent:', message);
      // Optionally, queue messages or attempt to reconnect and resend
    }
  }

  public getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  // Optional: filter messages by type if your backend sends different message types
  public getMessagesByType(type: string): Observable<any> {
    return this.messageSubject.asObservable().pipe(
      filter(msg => msg.type === type),
      map(msg => msg.data) // Assuming 'data' field holds the actual payload
    );
  }

  public close(): void {
    if (this.websocket) {
      console.log('Closing WebSocket connection...');
      this.websocket.close(1000, "Component shutting down"); // 1000 is normal closure
      this.websocket = undefined;
      this.isConnected = false;
    }
  }
}