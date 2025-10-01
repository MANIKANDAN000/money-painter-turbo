// frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // <--- Import ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';
// Don't forget to import your WebsocketService if it's provided in root
// If you uncommented it in the component, it's already provided in root.

@NgModule({
  declarations: [
    AppComponent,
    AddTransactionComponent,
    TransactionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // <--- Add ReactiveFormsModule here
    // If you're also using NgModel (template-driven forms), you'd import FormsModule here too.
  ],
  providers: [], // Your services would be here if not providedIn: 'root'
  bootstrap: [AppComponent]
})
export class AppModule { }