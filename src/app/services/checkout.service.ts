import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from './session-storage.service';

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
}
