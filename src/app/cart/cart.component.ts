import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../main/cart.service';
import { Subscription } from 'rxjs';
import { CartItem } from './cartitem.model';
import { Product } from '../main/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private cartUpdateSub:Subscription;
  cartItems: CartItem[];
  products: Product[];

  constructor(private cartService: CartService) {

   }

  ngOnInit() {
    this.cartService.getCartItems();
    this.cartUpdateSub = this.cartService.getCartUpdateListener().subscribe(cartData => {
      this.cartItems = cartData.cartItems;
      this.products = cartData.products;
      console.log(this.products, this.cartItems);
    });

  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  ngOnDestroy() {
    this.cartUpdateSub.unsubscribe();
  }
}
