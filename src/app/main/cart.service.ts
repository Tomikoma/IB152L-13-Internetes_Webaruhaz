import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { CartItem } from '../cart/cartitem.model';

@Injectable({providedIn: 'root'})
export class CartService {

  products: Product[];
  cartItems: CartItem[];

  private cartUpdatedListener = new Subject<{products: Product[], cartItems: CartItem[]}>();

  constructor(private http: HttpClient) {}

  addToCart(productId: number) {
    this.http.post('http://localhost:3000/api/products/cart/' + productId, {count: 1})
      .subscribe(response => {
        console.log(response);
      });
  }

  getCartItems() {
    this.http.get<{products: any[], cartItems: any[]}>('http://localhost:3000/api/products/cart')
    .subscribe(response => {
      this.products = response.products.map(product => {
        return {
          id: product.ID,
          productName: product.PRODUCTNAME,
          productNumber: product.PRODUCTNUMBER,
          productColor: product.PRODUCTCOLOR,
          releaseDate: new Date(product.RELEASEDATE),
          manufacturer: product.MANUFACTURER,
          price: product.PRICE,
          quantity: product.QUANTITY,
          productType: product.PRODUCTTYPE,
          imgUrl: product.IMGURL
        };
      });
      this.cartItems = response.cartItems;
      this.cartUpdatedListener.next({products: [...this.products], cartItems: [...this.cartItems]});
    });
  }

  removeFromCart(productId: number) {
    // itt kell a törlést megvalósitani
    console.log(productId) ;
  }

  getCartUpdateListener() {
    return this.cartUpdatedListener.asObservable();
  }
}
