import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categoryList$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.categoryList$ = this.categoryService.getCategories();
  }

  save(product) {
    this.productService.addProduct(product).subscribe(data => {
      if (data) {
        this.toastr.success("Successfully Added!");
        this.router.navigate(['admin/products']);
      }
      else {
        this.toastr.error("Not Added!")
      }
    });
  }

}
