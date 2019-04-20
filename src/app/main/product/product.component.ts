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

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.routeSub = this.route.params.subscribe( params => {
      this.productId = params.id;
      this.productType = params.type;
    });
   }

  ngOnInit() {
    this.productService.getProduct(this.productType, this.productId);
    this.productSub = this.productService.getOneProductUpdateListener()
      .subscribe(product => {
        product.RELEASEDATE = new Date(product.RELEASEDATE);
        if (this.productType === 'tv') {
          this.tv = product as any as TV;
        }
        if(this.productType === 'phone') {
          this.smartphone = product as any as Smartphone;
        }
        if( this.productType === 'notebook') {
          this.notebook = product as any as Notebook;
        }

      });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

}
