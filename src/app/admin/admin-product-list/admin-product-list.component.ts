import { Subscription } from "rxjs/internal/Subscription";
import { OnInit, OnDestroy, Component } from "@angular/core";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit, OnDestroy {

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
