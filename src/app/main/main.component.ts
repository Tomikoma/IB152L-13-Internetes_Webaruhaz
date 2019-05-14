import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Product} from './product.model';
import {Subscription} from 'rxjs';
import {ProductService} from './product.service';
import {PageEvent} from '@angular/material';
import {Advert} from './product/advert.model';
import {AuthService} from '../auth/auth.service';
import {CartService} from './cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {

  products: Product[];
  bought: any[];
  type: string;
  isLoading = false;
  totalProducts = 0;
  productsPerPage = 8;
  currentPage = 1;
  pageSizeOptions = [8, 16, 32];
  advertsList = Advert[10] = [
    new Advert('Kedvezmény Mánia', '../../assets/img/advert1.bmp'),
    new Advert('#színezd ki', '../../assets/img/advert2.bmp'),
    new Advert('Beépítettük a kedvezményeket', '../../assets/img/advert3.bmp'),
    new Advert('Megérkezett a Huawei P30 Lite', '../../assets/img/advert4.bmp'),
    new Advert('4 héten át tartó sima bőr', '../../assets/img/advert5.bmp')
  ];
  private productsSub: Subscription;
  breakpoint = 3;
  isUserAuthenticated = false;
  innerWidth : number ;
  private authStatusSub: Subscription;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe( params => {
      this.type = params.type;
    });
  }

  ngOnInit() {
    this.resize(window.innerWidth);
    this.isLoading = true;
    this.productService.getProducts(this.productsPerPage, this.currentPage, this.type);
    this.productsSub = this.productService.getProductUpdateListener()
    .subscribe(productsData => {
      this.isLoading = false;
      this.products = productsData.products;
      this.bought = productsData.bought;
      this.products = this.products.sort((a, b) => {
        let aBought = 0;
        let bBought = 0;
        this.bought.forEach(prod => {
        if (prod.ID === a.id) {
        aBought = prod.BOUGHT;
        }
        if (prod.ID === b.id) {
        bBought = prod.BOUGHT;
        }
    });
        return bBought - aBought;
      });
      this.totalProducts = productsData.count;
    });
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      });
    this.onResizeColumns(event);
  }

  addToCart(productId: number, type: string) {
    this.cartService.addToCart(productId, type);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productService.getProducts(this.productsPerPage, this.currentPage, this.type);
  }

  onResizeColumns(event) {
      this.resize(event.target.innerWidth);
  }

  resize(width:number){
    if (width < 650) {
      this.breakpoint = 1;
    } else if (width < 1000)  {
      this.breakpoint = 2;
    } else if (width < 1700) {
      this.breakpoint = 3;
    }else {
      this.breakpoint = 4;
    }
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
