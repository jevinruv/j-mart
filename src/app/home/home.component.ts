import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  filteredProductList: any[] = [];
  selectedCategory: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.productService.getAll()
      .pipe(switchMap(data => {
        this.productList = data;
        return this.route.queryParamMap;
      }))
      .subscribe(params => {

        this.selectedCategory = params.get('category');

        this.filteredProductList = (this.selectedCategory) ?
          this.productList.filter(product => product.category === this.selectedCategory) :
          this.productList;

      });
  }

  search(query: string) {
    this.filteredProductList = (query) ?
      this.productList.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) :
      this.productList;
  }

}
