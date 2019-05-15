import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from './cart/cartitem.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Order } from './order/order.model';
import { OrderedProduct } from './order/orderedproduct.model';
import { Product } from './main/product.model';
import { OrderToBeDelivered } from './adminpage/ordertobedelivered.model';
import { Income } from './adminpage/income.model';

@Injectable({providedIn: 'root'})
export class OrderService {


  orders: Order[];
  cities: string[];
  orderedProducts: OrderedProduct[];
  products: Product[];
  ordersToBeDelivered: OrderToBeDelivered[];
  incomes: Income[];
  private orderUpdateListener = new Subject<{orders: Order[], orderedProducts: OrderedProduct[], products: Product[]}>();
  private ordersForDeliveryUpdateListener = new Subject<{orders: OrderToBeDelivered[], cities: any[]}>();
  private incomeUpdateListener = new Subject<{incomes: Income[]}>();

  constructor(private http: HttpClient, private router: Router) { }

  order(cartItems: CartItem[], totalprice: number) {
    this.http.post('http://localhost:3000/api/orders', {cartItems, totalprice})
      .subscribe(response => {
        console.log(response);
      });
    this.router.navigate(['/']);
  }

  getOrders() {
    this.http
      .get<{orders: Order[], orderedProducts: OrderedProduct[], products: Product[], message: string}>('http://localhost:3000/api/orders')
      .subscribe(orderData => {
        orderData.orders.forEach(order => {
          order.BUYINGDATE = new Date(order.BUYINGDATE);
        });
        this.orders = orderData.orders;
        this.orderedProducts = orderData.orderedProducts;
        this.products = orderData.products;
        this.orderUpdateListener.next({orders: this.orders, orderedProducts: this.orderedProducts, products: this.products});
    });
  }

  pay(orderId: number, total: number) {
    this.http.patch('http://localhost:3000/api/orders/' + orderId, {total})
      .subscribe(response => {
        console.log(response);
        this.getOrders();
      }, () => {});
  }

  getIncome() {
    this.http.get<{incomes: Income[]}>('http://localhost:3000/api/orders/income')
    .subscribe(incomeData => {
      incomeData.incomes.forEach(income => {
        income.DATUM = new Date(income.DATUM);
      });
      this.incomes = incomeData.incomes;
      this.incomeUpdateListener.next({incomes: [...this.incomes]});
    });
  }

  deliver(city: string) {
    this.http.post('http://localhost:3000/api/orders/deliver', {city})
      .subscribe(response => {
        console.log(response);
        this.getOrdersForDelivery();
      }, () => {});
  }

  getOrdersForDelivery() {
    this.http.get<{orders: OrderToBeDelivered[], cities: any[]}>('http://localhost:3000/api/orders/deliver')
      .subscribe(orderData => {
        orderData.orders.forEach(order => {
          order.BUYINGDATE = new Date(order.BUYINGDATE);
          order.PAYDATE = new Date(order.PAYDATE);
        });
        this.ordersToBeDelivered = orderData.orders;
        this.cities = orderData.cities;
        this.ordersForDeliveryUpdateListener.next({orders: this.ordersToBeDelivered , cities: this.cities});
      });
  }

  getIncomeUpdateListener(){
    return this.incomeUpdateListener.asObservable();
  }

  getOrdersForDeliveryUpdateListener() {
    return this.ordersForDeliveryUpdateListener.asObservable();
  }

  getOrderUpdateListener() {
    return this.orderUpdateListener.asObservable();
  }
}
