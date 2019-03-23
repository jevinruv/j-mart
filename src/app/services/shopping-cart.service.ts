import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartForm } from '../models/shopping-cart-form';
import { Observable } from 'rxjs/internal/Observable';
import { PusherService } from './pusher.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  API_URL = environment.API_BASE_URL + '/carts';
  private channel: any;

  constructor(private http: HttpClient, private pusherService: PusherService) {
    this.channel = this.pusherService.getPusher().subscribe('cart');
  }

  getChannel() {
    return this.channel;
  }

  getCart(id): Observable<{}> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  list(): Observable<[]> {
    return this.http.get<[]>(this.API_URL);
  }

  addOrUpdate(param): Observable<{}> {
    return this.http.post(this.API_URL, param);
  }

  delete(id): Observable<{}> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
