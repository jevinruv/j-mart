import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { DiscountService } from '../services/discount.service';
import { forkJoin } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  discountList: any[] = [];
  filteredList: any[] = [];
  selectedCategory: string;
  shoppingCart: any = {};

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private discountService: DiscountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.shoppingCartService.getCart(1).subscribe(data => {
      this.shoppingCart = data;
    });

    let discounts = this.discountService.getAll();
    let products = this.productService.getAll();

    forkJoin([discounts, products]).subscribe(data => {
      this.discountList = data[0];
      this.productList = data[1];
      this.mergeList();
      this.categorySelection();
    });

    this.initListeners();

  }

  initListeners() {
    this.shoppingCartService.getChannel().bind('itemAdded', data => {
      this.shoppingCart.shoppingCartProducts.push(data);
    });

    this.shoppingCartService.getChannel().bind('itemUpdated', data => {
      let index = this.shoppingCart.shoppingCartProducts.findIndex(item => item.id == data.id);
      this.shoppingCart.shoppingCartProducts[index] = data;
    });

    this.shoppingCartService.getChannel().bind('itemRemoved', data => {
      this.shoppingCart.shoppingCartProducts = this.shoppingCart.shoppingCartProducts.filter(item => item.id !== data.id);
    });
  }

  search(query: string) {
    this.filteredList = (query) ?
      this.productList.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) :
      this.productList;
  }

  mergeList() {

    this.discountList.map(discount => {
      delete discount.id
    })

    this.productList = this.productList.map(product => {
      return Object.assign({}, product, this.discountList.find(discount => discount.productId === product.id))
    });
  }

  categorySelection() {
    this.route.queryParamMap.subscribe(params => {
      this.selectedCategory = params.get('category');

      this.filteredList = (this.selectedCategory) ?
        this.productList.filter(product => product.category.code === this.selectedCategory) :
        this.productList;
    });
  }
}
