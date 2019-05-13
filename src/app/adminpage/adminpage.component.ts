import { Component, OnInit, OnDestroy } from '@angular/core';
import {User} from '../list-users/user.model';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import { OrderService } from '../order.service';
import { OrderToBeDelivered } from './ordertobedelivered.model';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit, OnDestroy {

  users: User[] = [];
  orders: OrderToBeDelivered[];
  cities: string[];
  private usersSub: Subscription;
  private OrdersSub: Subscription;

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.usersSub = this.userService.getUsersUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
      });
    this.orderService.getOrdersForDelivery();
    this.OrdersSub = this.orderService.getOrdersForDeliveryUpdateListener()
      .subscribe(orderData => {
        this.orders = orderData.orders;
        this.cities = [];
        orderData.orders.forEach(order => {
          if (!this.cities.includes(order.CITY)) {
          this.cities.push(order.CITY);
          }
        });
      });
  }

  deliverOrders(city: string) {
    this.orderService.deliver(city);
  }

  getDifferenceInDays(date: Date) {
    return Math.round((new Date().valueOf() - date.valueOf()) / 1000 / 3600 / 24);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.OrdersSub.unsubscribe();

  }


}
