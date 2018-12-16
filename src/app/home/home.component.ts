import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { DiscountService } from '../services/discount.service';
import { forkJoin } from 'rxjs';

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

  constructor(
    private productService: ProductService,
    private discountService: DiscountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let discounts = this.discountService.getAll();
    let products = this.productService.getAll();

    forkJoin([discounts, products]).subscribe(data => {
      this.discountList = data[0];
      this.productList = data[1];
      this.mergeList();
      this.categorySelection();
    });



    // this.productService.getAll()
    //   .pipe(switchMap(data => {
    //     this.productList = data;
    //     return this.route.queryParamMap;
    //   }))
    //   .subscribe(params => {

    //     this.selectedCategory = params.get('category');

    //     this.filteredList = (this.selectedCategory) ?
    //       this.productList.filter(product => product.category === this.selectedCategory) :
    //       this.productList;

    //   });
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
        this.productList.filter(product => product.category === this.selectedCategory) :
        this.productList;

    });
  }
}
