import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  private routeSub: Subscription;
  productType: string;
  productId: number;

  constructor(private route: ActivatedRoute) {
    this.routeSub = this.route.params.subscribe( params => {
      this.productId = params.id;
      this.productType = params.type;
    });
   }

  ngOnInit() {
    console.log(this.productId);
    console.log(this.productType);
  }

  ngOnDestroy() {

  }

}
