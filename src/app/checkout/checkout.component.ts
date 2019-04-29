import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { DiscountService } from '../services/discount.service';
import { CheckoutService } from '../services/checkout.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  cartProductCount: number = 0;
  discount: number = 0;
  shoppingCart: any = {};
  discountList: any[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private discountService: DiscountService,
    private checkoutService: CheckoutService,
    private sessionService: SessionStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.shoppingCartService.getCart().subscribe(data => {
      // console.log(data);
      this.shoppingCart = data;
      this.getDiscounts();
      this.getTotalPrice();
      this.getProductCount();
    });
  }

  getDiscounts() {
    this.discountService.getAll().subscribe(data => {
      // console.log(data);
      this.discountList = data;
      this.getDiscount();
    });
  }

  onSubmit(checkoutForm) {
    // console.log(checkoutForm);

    this.checkoutService.doCheckout().subscribe(data => {
      this.sessionService.saveCartId(data['id']);
      this.router.navigateByUrl('');
      window.location.reload();
    });
  }

  getTotalPrice() {
    this.totalPrice = 0;

    if (this.shoppingCart) {
      let shoppingCartProducts = this.shoppingCart['shoppingCartProducts'];
      for (let cartItem of shoppingCartProducts) {
        this.totalPrice += cartItem.product.price * cartItem.quantity;
      }
    }
  }

  getProductCount() {
    this.cartProductCount = 0;
    if (this.shoppingCart) {
      let shoppingCartProducts = this.shoppingCart['shoppingCartProducts'];
      for (let cartItem of shoppingCartProducts) {
        this.cartProductCount += cartItem.quantity;
      }
    }
  }

  getDiscount() {
    this.discount = 0;

    if (this.shoppingCart) {
      let shoppingCartProducts = this.shoppingCart['shoppingCartProducts'];
      for (let cartItem of shoppingCartProducts) {
        let discount = this.discountList.find(discount => discount.productId == cartItem.product.id);
        if (discount) {
          let price = cartItem.product.price * (1 - discount.percentage / 100);
          this.discount += price;
        }
      }
    }
  }
}
