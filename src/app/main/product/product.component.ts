import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../product.service';
import { TV } from './tv.model';
import { Smartphone } from './smartphone.model';
import { Notebook } from './notebook.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  private productSub: Subscription;
  productType: string;
  productId: number;
  tv: TV;
  smartphone: Smartphone;
  notebook: Notebook;
  products: any[];
  selectedId: number;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.routeSub = this.route.params.subscribe( params => {
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

      });
  }

  compare(selectedId: number) {
    console.log(selectedId);
    //window.open('http://localhost:4200/products/tv/1', '_blank', 'width=700, height=700');
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

}
