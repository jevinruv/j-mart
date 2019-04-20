import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  product: Product = new Product();
  shoppingCart: any = {};
  quantity = 1;
  inCart = false;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get("id");

    this.productService.get(this.id).subscribe(result => {
      this.product = result;
    });

    this.shoppingCartService.getCart().subscribe(data => {
      this.shoppingCart = data;
      this.init();
    });

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

  valueChange(value) {
    if (value > 0) {
      this.quantity = value;
    }
    else {
      this.quantity = 1;
    }
  }

  addToCart() {

    this.inCart = true;

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
        // console.error(error);
      });
  }

  removeFromCart() {

    this.inCart = false;

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
        // console.error(error);
      });
  }
}
