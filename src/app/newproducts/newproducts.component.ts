import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../main/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../main/product.service';

@Component({
  selector: 'app-newproducts',
  templateUrl: './newproducts.component.html',
  styleUrls: ['./newproducts.component.css']
})
export class NewproductsComponent implements OnInit, OnDestroy {

  tvs: Product[];
  notebooks: Product[];
  smartphones: Product[];
  private productSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getLatestProducts();
    this.productSub = this.productService.getLatestProductUpdateListener()
      .subscribe(productData => {
        this.tvs = productData.tvs;
        this.notebooks = productData.notebooks;
        this.smartphones = productData.smartphones;
        console.log(this.tvs,this.notebooks,this.smartphones);
      });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

}
