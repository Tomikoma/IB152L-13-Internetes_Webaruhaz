import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product.model';
import { Subscription } from 'rxjs';
import { ProductService } from './product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  products: Product[];
  private productsSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts();
    this.productsSub = this.productService.getProductUpdateListener()
    .subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
