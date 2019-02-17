import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ShoppingCartForm } from '../models/shopping-cart-form';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  API_URL = environment.API_BASE_URL + '/carts';

  constructor(private http: HttpClient) { }

  private create(userId) {
    return this.http.post(this.API_URL + '/create', userId);
  }

  private manageCart(shoppingCartForm: ShoppingCartForm) {
    return this.http.post(this.API_URL, shoppingCartForm);
  }

  getCart() {
    let cartId = this.getOrCreateCartId();
    return this.http.get(this.API_URL + `/${cartId}`);
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    this.create(2).subscribe(data => {
      localStorage.setItem('cartId', data['id']);
      return localStorage.getItem('cartId');
    });
  }

  addToCart(product) {
    return this.updateCartProductQuantity(product, 1);
  }

  removeFromCart(product) {
    return this.updateCartProductQuantity(product, -1);
  }

  private updateCartProductQuantity(product, value: number) {
    let cartId = this.getOrCreateCartId();
    let shoppingCartForm = new ShoppingCartForm(Number(cartId), product.id, value);

    return this.manageCart(shoppingCartForm);
  }

}
