import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = environment.API_BASE_URL + "/products";

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<[]>(this.API_URL);
  }

  getProduct(id) {
    return this.http.get(this.API_URL + `/${id}`);
  }

  addProduct(product) {
    return this.http.post(this.API_URL, product);
  }

}
