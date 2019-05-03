import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../main/cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from './cartitem.model';
import { Product } from '../main/product.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private cartUpdateSub:Subscription;
  cartItems: CartItem[];
  products: Product[];

  constructor(private cartService: CartService, private orderService: OrderService) {

   }

  ngOnInit() {
    this.cartService.getCartItems();
    this.cartUpdateSub = this.cartService.getCartUpdateListener().subscribe(cartData => {
      this.cartItems = cartData.cartItems;
      this.products = cartData.products;
    });

  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  order(){
    let totalprice = 0;
    this.products.forEach(product => {
      this.cartItems.forEach(cartItem => {
        if (product.id === cartItem.PRODUCT_ID) {
          totalprice += product.price * cartItem.QUANTITY;
        }
      });
    });
    this.orderService.order(this.cartItems, totalprice);
  }

  ngOnDestroy() {
    this.cartUpdateSub.unsubscribe();
  }
}
