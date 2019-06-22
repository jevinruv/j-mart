import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  API_URL = "/api/checkout";

  constructor(
    private http: HttpClient,
    private sessionService: SessionStorageService
  ) { }

  doCheckout() {
    let cartId = this.sessionService.getCartId();
    return this.http.get(this.API_URL + `/${cartId}`);
  }

  getHistory() {
    let userId = this.sessionService.getUserId();
    return this.http.get<ShoppingCart[]>(this.API_URL + `/historyW/${userId}`);
  }
}
