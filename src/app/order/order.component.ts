import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from './order.model';
import { Subscription } from 'rxjs';
import { OrderedProduct } from './orderedproduct.model';
import { Product } from '../main/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  orders: Order[];
  orderedProducts: OrderedProduct[];
  products: Product[]
  orderUpdateSub: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders();
    this.orderUpdateSub = this.orderService.getOrderUpdateListener()
      .subscribe(orderData => {
        this.orders = orderData.orders;
        this.orderedProducts = orderData.orderedProducts;
        this.products = orderData.products;
      });
  }

  ngOnDestroy() {
    this.orderUpdateSub.unsubscribe();
  }

}
