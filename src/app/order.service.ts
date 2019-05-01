import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart/cartitem.model';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(private http: HttpClient) { }

  order(cartItems: CartItem[]) {
    this.http.post('http://localhost:3000/api/orders', {cartItems})
      .subscribe(response => {
        console.log(response);
      });
  }
}
