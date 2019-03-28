import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: any = {};
  cartProductCount: number = 0;
  totalPrice: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.shoppingCartService.getCart().subscribe(data => {
      this.shoppingCart = data;

      this.setValues();
    });

    this.initListeners();
  }

  initListeners() {
    this.shoppingCartService.getChannel().bind('itemAdded', data => {
      this.shoppingCart.shoppingCartProducts.push(data);

      this.setValues();
    });

    this.shoppingCartService.getChannel().bind('itemUpdated', data => {
      let index = this.shoppingCart.shoppingCartProducts.findIndex(item => item.id == data.id);
      this.shoppingCart.shoppingCartProducts[index] = data;

      this.setValues();
    });

    this.shoppingCartService.getChannel().bind('itemRemoved', data => {
      this.shoppingCart.shoppingCartProducts = this.shoppingCart.shoppingCartProducts.filter(item => item.id !== data.id);
      // this.shoppingCart.shoppingCartProducts = this.shoppingCart.shoppingCartProducts.filter(item => {
      //   console.log(item.id !== data.id);
      // });

      this.setValues();
    });

    this.shoppingCartService.getChannel().bind('cartDeleted', data => {
      this.shoppingCart.shoppingCartProducts = [];

      this.setValues();
    });
  }

  setValues() {
    this.getProductCount();
    this.getTotalPrice();
  }

  private getProductCount() {
    this.cartProductCount = 0;
    if (this.shoppingCart) {
      let shoppingCartProducts = this.shoppingCart['shoppingCartProducts'];
      for (let cartItem of shoppingCartProducts) {
        this.cartProductCount += cartItem.quantity;
      }
    }
  }

  private getTotalPrice() {
    this.totalPrice = 0;

    if (this.shoppingCart) {
      let shoppingCartProducts = this.shoppingCart['shoppingCartProducts'];
      for (let cartItem of shoppingCartProducts) {
        this.totalPrice += cartItem.product.price * cartItem.quantity;
      }
    }
  }

  increaseCartItem(cartItem) {

    let cartId = this.shoppingCartService.getOrCreateCartId();

    let newCartItem = {
      shoppingCartId: cartId,
      productId: cartItem.product.id,
      quantity: cartItem.quantity + 1
    };

    this.shoppingCartService.addOrUpdate(newCartItem).subscribe();
  }

  decreaseCartItem(cartItem) {

    let cartId = this.shoppingCartService.getOrCreateCartId();
    let newCartItem = {
      shoppingCartId: cartId,
      productId: cartItem.product.id,
      quantity: cartItem.quantity - 1
    };

    this.shoppingCartService.addOrUpdate(newCartItem).subscribe();
  }

  clearCart() {
    this.shoppingCartService.clearCart().subscribe();
  }



}
