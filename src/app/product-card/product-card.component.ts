import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('cart') shoppingCart;
  quantity = 1;
  inCart = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {

    if (this.shoppingCart && this.shoppingCart.shoppingCartProducts) {

      let item = this.shoppingCart.shoppingCartProducts.find(item => item.id === this.product.id);

      if (item) {
        this.quantity = item.quantity;
        this.inCart = true;
      }
    }


    this.initListeners();
  }

  initListeners() {
    this.shoppingCartService.getChannel().bind('itemAdded', data => {
      // this.shoppingCart.shoppingCartProducts.push(data);
      if (data.product.id === this.product.id) {
        this.quantity = data.quantity;
        this.inCart = true;
      }
    });

    this.shoppingCartService.getChannel().bind('itemUpdated', data => {
      // let index = this.shoppingCart.shoppingCartProducts.findIndex(item => item.id == data.id);
      // this.shoppingCart.shoppingCartProducts[index] = data;

      if (data.product.id === this.product.id) {
        this.quantity = data.quantity;
        this.inCart = true;
      }
    });

    this.shoppingCartService.getChannel().bind('itemRemoved', data => {
      this.shoppingCart.shoppingCartProducts = this.shoppingCart.shoppingCartProducts.filter(item => item.id !== data.id);

    });
  }

  addToCart() {

    let cartId = this.shoppingCartService.getOrCreateCartId();

    let p = {
      shoppingCartId: cartId,
      productId: this.product.id,
      quantity: this.quantity
    };

    this.shoppingCartService.addOrUpdate(p).subscribe(
      data => {
        // console.log(data);
      },
      error => {
        console.error(error);
      });
  }

}
