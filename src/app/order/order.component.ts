import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from './order.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  orders: Order[];
  orderUpdateSub: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders();
    this.orderUpdateSub = this.orderService.getOrderUpdateListener()
      .subscribe(orderData => {
        this.orders = orderData.orders;
      });
  }

  ngOnDestroy() {
    this.orderUpdateSub.unsubscribe();
  }

}
