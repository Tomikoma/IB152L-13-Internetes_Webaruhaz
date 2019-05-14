import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../product.service';
import { TV } from './tv.model';
import { Smartphone } from './smartphone.model';
import { Notebook } from './notebook.model';
import { AuthService } from 'src/app/auth/auth.service';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private productSub: Subscription;
  productType: string;
  productId: number;
  tv: TV;
  smartphone: Smartphone;
  notebook: Notebook;
  products: any[];
  selectedId: number;
  isUserAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(private cartService : CartService,  private route: ActivatedRoute, private productService: ProductService, private authService: AuthService) {
    this.route.params.subscribe( params => {
      this.productId = params.id;
      this.productType = params.type;
    });
   }

  ngOnInit() {
    this.productService.getProduct(this.productType, this.productId);
    this.productSub = this.productService.getOneProductUpdateListener()
      .subscribe(productData => {
        productData.product.RELEASEDATE = new Date(productData.product.RELEASEDATE);
        if (this.productType === 'tv') {
          this.tv = productData.product as TV;
        }
        if (this.productType === 'phone') {
          this.smartphone = productData.product as Smartphone;
        }
        if ( this.productType === 'notebook') {
          this.notebook = productData.product as Notebook;
        }
        this.products = productData.products;
        this.selectedId = this.products[0].ID;
      });
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  compare(selectedId: number) {
    window
// tslint:disable-next-line: max-line-length
      .open('http://localhost:4200/products/' + this.productType + '/' + this.productId + '/compare/' + selectedId, '_blank', 'width=700, height=700');
  }

  addToCart() {
    this.cartService.addToCart(this.productId, this.productType);
  }
  
  ngOnDestroy() {
    this.productSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }



}
