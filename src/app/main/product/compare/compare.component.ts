import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';
import { TV } from '../tv.model';
import { Smartphone } from '../smartphone.model';
import { Notebook } from '../notebook.model';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit, OnDestroy {

  productType: string;
  firstProductId: number;
  secondProductId: number;
  productsSub: Subscription;
  firstTv: TV;
  secondTv: TV;
  tvFields = [  'ID', 'PRODUCTNAME', 'PRODUCTNUMBER', 'PRODUCTCOLOR', 'RELEASEDATE',
    'MANUFACTURER', 'PRICE', 'QUANTITY', 'PRODUCTTYPE', 'RESOLUTION', 'SCREENSIZE', 'PANELTYPE', 'REFRESHRATE', 'PORTTYPE'];
  firstSmartphone: Smartphone;
  secondSmartphone: Smartphone;
  firstNotebook: Notebook;
  secondNotebook: Notebook;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.params.subscribe(params => {
      this.productType = params.type;
      this.firstProductId = params.id1;
      this.secondProductId = params.id2;
    });
  }

  ngOnInit() {
    this.productService.getProductsToCompare(this.productType, this.firstProductId, this.secondProductId);
    this.productsSub = this.productService.getTwoProductUpdateListener()
      .subscribe(products => {
        //console.log(products);
        products.firstProduct.RELEASEDATE = new Date(products.firstProduct.RELEASEDATE);
        products.secondProduct.RELEASEDATE = new Date(products.secondProduct.RELEASEDATE);
        if (this.productType === 'tv') {
          this.firstTv = products.firstProduct as TV;
          this. secondTv = products.secondProduct as TV;
        }
        if (this.productType === 'phone') {
          this.firstSmartphone = products.firstProduct as Smartphone;
          this. secondSmartphone = products.secondProduct as Smartphone;
        }
        if (this.productType === 'notebook') {
          this.firstNotebook = products.firstProduct as Notebook;
          this. secondNotebook = products.secondProduct as Notebook;
        }
      });
  }


  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }

}
