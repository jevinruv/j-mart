import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../services/session-storage.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isNavbarCollapsed;
  username: string;
  cartProductCount: number = 0;
  shoppingCart: any = {};

  constructor(
    private sessionService: SessionStorageService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.username = this.sessionService.getUsername();

    this.shoppingCartService.getCart().subscribe(data => {
      this.shoppingCart = data;

      this.getProductCount();
    });

    this.initListeners();
  }

  initListeners() {

    this.shoppingCartService.getChannel().bind('itemAdded', data => {
      this.shoppingCart.shoppingCartProducts.push(data);

      this.getProductCount();
    });

    this.shoppingCartService.getChannel().bind('itemUpdated', data => {
      let index = this.shoppingCart.shoppingCartProducts.findIndex(item => item.id == data.id);
      this.shoppingCart.shoppingCartProducts[index] = data;

      this.getProductCount();
    });

    this.shoppingCartService.getChannel().bind('itemRemoved', data => {
      this.shoppingCart.shoppingCartProducts = this.shoppingCart.shoppingCartProducts.filter(item => item.id !== data.id);

      this.getProductCount();
    });

    this.shoppingCartService.getChannel().bind('cartDeleted', data => {
      this.shoppingCart.shoppingCartProducts = [];

      this.sessionService.saveCartId("");

      this.shoppingCartService.getCart().subscribe(data => {
        this.shoppingCart = data;

        this.getProductCount();
      });

    });

    this.shoppingCartService.getChannel().bind('cartCheckOut', data => {
      this.shoppingCart.shoppingCartProducts = [];

      this.shoppingCartService.getCart().subscribe(data => {
        this.shoppingCart = data;
        this.getProductCount();
      });

    });
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


  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.sessionService.signout();
    window.location.reload();
  }

}
