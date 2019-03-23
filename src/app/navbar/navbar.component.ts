import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
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
  shoppingCart;

  constructor(
    private tokenService: TokenStorageService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.username = this.tokenService.getUsername();

    this.shoppingCartService.getCart().subscribe(data => {
      if (data) {
        let shoppingCartProducts = data['shoppingCartProducts'];
        for (let product of shoppingCartProducts) {
          this.cartProductCount += product.quantity;
        }
      }
    });
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.tokenService.signout();
    window.location.reload();
  }

}
