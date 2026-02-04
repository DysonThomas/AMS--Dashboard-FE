import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  isLoggedIn = signal(false);
  constructor() {
    const token = localStorage.getItem('token');
    this.isLoggedIn.set(!!token);
  }
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  getStoreId(): string {
    return localStorage.getItem('storeId') || '';
  }
  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }
}
