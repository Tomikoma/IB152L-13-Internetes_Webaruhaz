import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';
import { PageEvent } from '@angular/material';
import {Advert} from './product/advert.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  products: Product[];
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
  imgWidth = 100;
  breakpoint = 2;

  constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.isLoading = true;
    this.productService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.productService.getProductUpdateListener()
    .subscribe(productsData => {
      this.isLoading = false;
      this.products = productsData.products;
      this.totalProducts = productsData.count;
    });
    this.onResizeColumns(event);
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productService.getProducts(this.productsPerPage, this.currentPage);
  }

  onResizeColumns(event) {
    this.breakpoint = 4;
    if (event.target.innerWidth < 650) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth < 1000)  {
      this.breakpoint = 2;
    } else if (event.target.innerWidth < 1700) {
      this.breakpoint = 3;
    }
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
