import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  products: Product[];
  isLoading = false;
  totalProducts = 0;
  productsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 15];

  private productsSub: Subscription;

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
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.productService.getProducts(this.productsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
