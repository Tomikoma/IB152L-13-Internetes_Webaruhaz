import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductService {

  private products: Product[];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get<{message: string, products: any}>('http://localhost:3000/api/products')
      .pipe(map(productData => {
        return productData.products.map( product => {
          return {
            id: product.ID,
            productName: product.PRODUCTNAME,
            productNumber: product.PRODUCTNUMBER,
            productColor: product.PRODUCTCOLOR,
            releaseDate: new Date(product.RELEASEDATE),
            manufacturer: product.MANUFACTURER,
            price: product.PRICE,
            quantity: product.QUANTITY
          };
        });
      })
      )
      .subscribe((transformedProducts) => {
        this.products = transformedProducts;
        this.productsUpdated.next([...this.products]);
      });
  }


  getProductUpdateListener(){
    return this.productsUpdated.asObservable();
  }

}
