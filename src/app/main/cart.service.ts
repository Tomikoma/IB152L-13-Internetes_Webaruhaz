import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CartService {

  constructor(private http: HttpClient) {}

  addToCart(productId: number) {
    this.http.post('http://localhost:3000/api/products/cart/' + productId, {count: 1})
      .subscribe(response => {
        console.log(response);
      });
  }

  getCartItems() {

  }

  removeFromCart() {

  }
}
