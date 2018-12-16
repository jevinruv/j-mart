import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  productList: { name: string }[];
  filteredProductList: any[];
  prodListSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.prodListSubscription = this.productService.getAll().subscribe(data => {
      this.filteredProductList = this.productList = data;
    });
  }

  ngOnDestroy() {
    this.prodListSubscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProductList = (query) ?
      this.productList.filter(product => product.name.toLowerCase().includes(query.toLowerCase())) :
      this.productList;
  }

}
