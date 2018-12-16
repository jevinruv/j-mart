import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  API_URL = environment.API_BASE_URL + "/discounts";

  constructor(private http: HttpClient) { }

  get(id) {
    return this.http.get(this.API_URL + `${id}`)
  }

  getAll() {
    return this.http.get<[]>(this.API_URL);
  }
}
