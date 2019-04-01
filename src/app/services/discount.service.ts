import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  API_URL = "/api/discounts";

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get(this.API_URL + `${id}`)
  }

  getAll() {
    return this.http.get<[]>(this.API_URL);
  }
}
