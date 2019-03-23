import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {


  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe(data => {
      this.shoppingCart = data;
      this.getQuantity();
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product).subscribe(data => {
      this.shoppingCart = data;
      this.getQuantity();
    });
  }


  getQuantity() {
    if (!this.shoppingCart) return 0;

    let shoppingCartProducts = this.shoppingCart.shoppingCartProducts;
    let product = shoppingCartProducts.find(product => product.product.id == this.product.id);

    return product ? product.quantity : 0;
  }

}
