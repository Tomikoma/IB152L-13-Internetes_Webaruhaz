import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductService {

  private products: Product[];
  private bought: any[];
  private productsUpdated = new Subject<{products: Product[], count: number, bought: any[]}>();
  private productUpdated = new Subject<{product: any, products: any[]}>();
  private twoProductsUpdated = new Subject<{firstProduct: any, secondProduct: any}>();
  private latestProductsUpdateListener = new Subject<{tvs: Product[], notebooks: Product[], smartphones: Product[]}>();
  tvs: Product[];
  notebooks: Product[];
  smartphones: Product[];

  constructor(private http: HttpClient) {}

  getProducts(productsPerPage: number, currentPage: number, type: string) {
    const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
    this.http
    .get<{message: string, products: any, count: number, bought: any}>('http://localhost:3000/api/products/pr/' + type  + queryParams)
      .subscribe((productData) => {
        this.products = productData.products;
        this.products.forEach(element => {
          element.releaseDate = new Date(element.releaseDate);
        });
        this.bought = productData.bought;
        this.productsUpdated.next({products: this.products, count: productData.count, bought: this.bought});
      });
  }

  getProduct(type: string, id: number) {
    this.http.get<{product: any, products: any[]}>('http://localhost:3000/api/products/' + type + '/' + id )
      .subscribe(productData => {
        productData.product.releaseDate = new Date(productData.product.releaseDate);
        this.productUpdated.next({product: productData.product, products: productData.products});
      });
  }

  getProductsToCompare(type: string, id1: number, id2: number) {
    this.http.get<{firstProduct: any, secondProduct: any}>('http://localhost:3000/api/products/' + type + '/' + id1 + '/compare/' + id2)
      .subscribe(products => {
        products.firstProduct.releaseDate = new Date(products.firstProduct.releaseDate);
        products.secondProduct.releaseDate = new Date(products.secondProduct.releaseDate);
        this.twoProductsUpdated.next({firstProduct: products.firstProduct, secondProduct: products.secondProduct});
      });
  }

  getLatestProducts() {
    this.http.get<{tvs: any[], notebooks: any[], smartphones: any[]}>('http://localhost:3000/api/products')
    .subscribe(productData => {
      this.tvs = productData.tvs;
      this.tvs.forEach(element => {
        element.releaseDate = new Date(element.releaseDate);
      });
      console.log(productData)
      this.notebooks = productData.notebooks;
      this.notebooks.forEach(element => {
        element.releaseDate = new Date(element.releaseDate);
      });
      this.smartphones = productData.smartphones;
      this.smartphones.forEach(element => {
        element.releaseDate = new Date(element.releaseDate);
      });
      this.latestProductsUpdateListener.next({tvs: this.tvs, notebooks: this.notebooks, smartphones: this.smartphones});
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

  getLatestProductUpdateListener() {
    return this.latestProductsUpdateListener.asObservable();
  }

}
