import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductService {

  private products: Product[];
  private productsUpdated = new Subject<{products: Product[], count: number}>();
  private productUpdated = new Subject<{product: any, products: any[]}>();
  private twoProductsUpdated = new Subject<{firstProduct: any, secondProduct: any}>();

  constructor(private http: HttpClient) {}

  getProducts(productsPerPage: number, currentPage: number, type: string) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, products: any, count: number}>('http://localhost:3000/api/products/' + type  + queryParams, )
      .pipe(map(productData => {
        return { transformedProducts: productData.products.map( product => {
          return {
            id: product.ID,
            productName: product.PRODUCTNAME,
            productNumber: product.PRODUCTNUMBER,
            productColor: product.PRODUCTCOLOR,
            releaseDate: new Date(product.RELEASEDATE),
            manufacturer: product.MANUFACTURER,
            price: product.PRICE,
            quantity: product.QUANTITY,
            productType: product.PRODUCTTYPE,
            imgUrl: product.IMGURL
          };
        }),
         count: productData.count[0].COUNT};
      })
      )
      .subscribe((productData) => {
        this.products = productData.transformedProducts;
        this.productsUpdated.next({products: [...this.products], count: productData.count});
      });
  }

  getProduct(type: string, id: number) {
    this.http.get<{product: any, products: any[]}>('http://localhost:3000/api/products/' + type + '/' + id )
      .subscribe(productData => {
        this.productUpdated.next({product: productData.product, products: productData.products});
      });
  }

  getProductsToCompare(type: string, id1: number, id2: number) {
    this.http.get<{firstProduct: any, secondProduct: any}>('http://localhost:3000/api/products/' + type + '/' + id1 + '/compare/' + id2)
      .subscribe(products => {
        this.twoProductsUpdated.next({firstProduct: products.firstProduct, secondProduct: products.secondProduct});
      });
  }


  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }
  getOneProductUpdateListener() {
    return this.productUpdated.asObservable();
  }

  getTwoProductUpdateListener() {
    return this.twoProductsUpdated.asObservable();
  }

}
