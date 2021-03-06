import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PusherService } from './pusher.service';
import { ShoppingCart } from '../models/shopping-cart';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  API_URL = "/api/carts";
  private channel: any;

  constructor(
    private http: HttpClient,
    private pusherService: PusherService,
    private sessionService: SessionStorageService
  ) {

    let cartId = this.sessionService.getCartId();
    this.channel = this.pusherService.getPusher().subscribe('cart' + cartId);
  }

  getChannel() {
    return this.channel;
  }

  addOrUpdate(param): Observable<{}> {
    return this.http.post(this.API_URL, param);
  }

  deleteCartItem(cartItem): Observable<{}> {

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: cartItem
    };
    return this.http.delete(this.API_URL, options);
  }

  clearCart(): Observable<{}> {
    let cartId = this.sessionService.getCartId();
    this.sessionService.saveCartId("");
    return this.http.delete(`${this.API_URL}/${cartId}`);
  }

  getCart(): Observable<ShoppingCart> {
    let cartId = this.getOrCreateCartId();
    return this.http.get<ShoppingCart>(this.API_URL + `/${cartId}`);
  }

  getOrCreateCartId() {
    let cartId = this.sessionService.getCartId();
    if (cartId) return cartId;

    this.fetch().subscribe(data => {
      this.sessionService.saveCartId(data['id']);
      return this.sessionService.getCartId();
    });
  }

  private fetch() {
    let userId = this.sessionService.getUserId();
    return this.http.get(this.API_URL + `/fetch/${userId}`);
  }

}