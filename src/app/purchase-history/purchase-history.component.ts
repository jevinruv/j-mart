import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  purchaseHistory = [];
  cartProductCount: number = 0;
  totalPrice: number = 0;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {

    this.checkoutService.getHistory().subscribe(data => {
      // console.log(data);
      this.purchaseHistory = data;
      this.setValues();
    });
  }

  setValues() {
    this.getProductCount();
    this.getTotalPrice();
  }

  private getProductCount() {
    this.cartProductCount = 0;

    if (this.purchaseHistory) {
      for (let cartItem of this.purchaseHistory) {
        this.cartProductCount += cartItem.quantity;
      }
    }
  }

  private getTotalPrice() {
    this.totalPrice = 0;

    if (this.purchaseHistory) {
      for (let cartItem of this.purchaseHistory) {
        this.totalPrice += cartItem.product.price * cartItem.quantity;
      }
    }
  }

}
