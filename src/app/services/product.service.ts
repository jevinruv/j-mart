import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = "/api/products";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Product[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<Product>(this.API_URL + `/${id}`);
  }

  addOrUpdate(product) {
    return this.http.post(this.API_URL, product);
  }

  delete(id) {
    return this.http.delete(this.API_URL + `/${id}`);
  }

}
