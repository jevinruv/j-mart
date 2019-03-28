import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnChanges {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('cart') shoppingCart;
  quantity = 1;
  inCart = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.init();
    this.initListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shoppingCart = changes.shoppingCart.currentValue;
    this.init();
  }

  init() {
    if (this.shoppingCart && this.shoppingCart.shoppingCartProducts) {

      let item = this.shoppingCart.shoppingCartProducts.find(item => item.product.id === this.product.id);
      if (item) {
        this.quantity = item.quantity;
        this.inCart = true;
      }
    }
  }

  initListeners() {
    this.shoppingCartService.getChannel().bind('itemAdded', data => {
      if (data.product.id === this.product.id) {
        this.quantity = data.quantity;
        this.inCart = true;
      }
    });

    this.shoppingCartService.getChannel().bind('itemUpdated', data => {

      if (data.product.id === this.product.id) {
        this.quantity = data.quantity;
        this.inCart = true;
      }
    });

    this.shoppingCartService.getChannel().bind('itemRemoved', data => {

      if (data.product.id === this.product.id) {
        this.inCart = false;
      }
    });

    this.shoppingCartService.getChannel().bind('cartDeleted', data => {
      this.shoppingCart = {};
      this.inCart = false;
    });
  }

  addToCart() {

    let cartId = this.shoppingCartService.getOrCreateCartId();

    let cartItem = {
      shoppingCartId: cartId,
      productId: this.product.id,
      quantity: this.quantity
    };

    this.shoppingCartService.addOrUpdate(cartItem).subscribe(
      data => {
        // console.log(data);
      },
      error => {
        console.error(error);
      });
  }

  removeFromCart() {

    let cartId = this.shoppingCartService.getOrCreateCartId();

    let cartItem = {
      shoppingCartId: cartId,
      productId: this.product.id,
      quantity: this.quantity
    };

    this.shoppingCartService.deleteCartItem(cartItem).subscribe(
      data => {
        // console.log(data);
      },
      error => {
        console.error(error);
      });
  }

}
