import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { CartItem } from '../cart/cartitem.model';
import { ProductService } from './product.service';

@Injectable({providedIn: 'root'})
export class CartService {

  products: Product[];
  recommendedProducts: Product[];
  cartItems: CartItem[];

  private cartUpdatedListener = new Subject<{products: Product[], cartItems: CartItem[], recommendedProducts: Product[]}>();

  constructor(private http: HttpClient, private productService: ProductService) {}

  addToCartFromMain(productId: number, productsPerPage: number, currentPage: number, type: string) {
    this.http.post('http://localhost:3000/api/products/cart/' + type + '/' + productId, {count: 1})
      .subscribe(response => {
        console.log(response);
        this.productService.getProducts(productsPerPage, currentPage, type);
      });
  }

  addToCart(productId: number, type: string) {
    this.http.post('http://localhost:3000/api/products/cart/' + type + '/' + productId, {count: 1})
      .subscribe(response => {
        console.log(response);
        this.productService.getProduct(type, productId);
      });
  }

  getCartItems() {
    this.http.get<{products: any[], cartItems: any[], recommendedProducts: any[]}>('http://localhost:3000/api/products/cart')
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
      this.recommendedProducts = response.recommendedProducts;
      this.cartUpdatedListener.next({
        products: [...this.products],
        cartItems: [...this.cartItems],
        recommendedProducts: [...this.recommendedProducts]});
    });
  }

  removeFromCart(productId: number, type:string) {
    this.http.put('http://localhost:3000/api/products/cart/' + type + '/' + productId, {count: 1})
      .subscribe(response => {
        console.log(response);
        this.getCartItems();
      });
  }

  getCartUpdateListener() {
    return this.cartUpdatedListener.asObservable();
  }
}
