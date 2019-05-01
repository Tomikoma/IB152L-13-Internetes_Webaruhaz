import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart/cartitem.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Order } from './order/order.model';

@Injectable({providedIn: 'root'})
export class OrderService {

  orders: Order[];
  private orderUpdateListener = new Subject<{orders: Order[]}>();

  constructor(private http: HttpClient, private router: Router) { }

  order(cartItems: CartItem[], totalprice: number) {
    this.http.post('http://localhost:3000/api/orders', {cartItems, totalprice})
      .subscribe(response => {
        console.log(response);
      });
    this.router.navigate(['/order']);
  }

  getOrders() {
    this.http.get<{orders: Order[], message: string}>('http://localhost:3000/api/orders')
      .subscribe(orderData => {
        orderData.orders.forEach(order => {
          order.BUYINGDATE = new Date(order.BUYINGDATE);
        });
        this.orders = orderData.orders;
        this.orderUpdateListener.next({orders: this.orders});
    });
  }

  getOrderUpdateListener() {
    return this.orderUpdateListener.asObservable();
  }
}
