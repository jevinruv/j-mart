import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  API_URL = "/api/products";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[]>(this.API_URL);
  }

  getProduct(id) {
    return this.http.get(this.API_URL + `/${id}`);
  }

  addProduct(product) {
    let newProduct = {
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.description
    };
    // console.log(newProduct);
    return this.http.post(this.API_URL + `/new/${product.category.id}`, newProduct);
  }

  updateProduct(product) {
    return this.http.put(this.API_URL, product);
  }

  delete(id) {
    return this.http.delete(this.API_URL + `/${id}`);
  }

}
