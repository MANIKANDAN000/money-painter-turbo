import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Money Painter Turbo</h1>
    <nav>
      <a routerLink="/transactions" routerLinkActive="active">Transactions</a> |
      <a routerLink="/add">Add Transaction</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    h1 { text-align: center; font-family: Arial, sans-serif; }
    nav { text-align: center; margin-bottom: 20px; }
    a { margin: 0 10px; text-decoration: none; color: #007bff; }
    a.active { font-weight: bold; }
  `]
})
export class AppComponent { }
