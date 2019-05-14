import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../main/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../main/product.service';
import { Advert } from '../main/product/advert.model';

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
  breakpoint: number ;
  products ;

  advertsList = Advert[10] = [
    new Advert('Kedvezmény Mánia', '../../assets/img/advert1.bmp'),
    new Advert('#színezd ki', '../../assets/img/advert2.bmp'),
    new Advert('Beépítettük a kedvezményeket', '../../assets/img/advert3.bmp'),
    new Advert('Megérkezett a Huawei P30 Lite', '../../assets/img/advert4.bmp'),
    new Advert('4 héten át tartó sima bőr', '../../assets/img/advert5.bmp')
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.breakpoint = 3;
    this.productService.getLatestProducts();
    this.productSub = this.productService.getLatestProductUpdateListener()
      .subscribe(productData => {
        this.tvs = productData.tvs;
        this.notebooks = productData.notebooks;
        this.smartphones = productData.smartphones;
        this.products = [this.tvs,this.notebooks,this.smartphones] ;
        console.log(this.tvs,this.notebooks,this.smartphones);
      });
  }

  ngOnDestroy() {
    this.productSub.unsubscribe();
  }

  onResizeColumns(event) {
    this.breakpoint = 4;
    if (event.target.innerWidth < 700) {
      this.breakpoint = 1;
    } else if (event.target.innerWidth < 1000)  {
      this.breakpoint = 2;
    } else if (event.target.innerWidth < 1700) {
      this.breakpoint = 3;
    }
  }

}
