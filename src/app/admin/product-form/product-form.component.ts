import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  categoryList;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      productService.getProduct(this.id).pipe(take(1)).subscribe(data => {
        this.product = data;
      });
    }
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(data => {
      this.categoryList = data;
    });
  }

  compareByOptionId(idFirst, idSecond) {
    return idFirst && idSecond && idFirst.id == idSecond.id;
  }

  save() {

    if (this.id) {
      this.updateProduct(this.product);
    }
    else {
      this.addProduct(this.product);
    }

  }

  delete() {
    if (confirm("Delete Product?")) {
      this.productService.delete(this.id).subscribe(data => {
        if (data) {
          this.toastr.success("Successfully Deleted!");
          this.router.navigate(['admin/products']);
        }
        else {
          this.toastr.error("Not Deleted!");
        }
      });
    }
  }

  addProduct(product) {
    this.productService.addProduct(product).subscribe(
      data => {
        this.toastr.success("Successfully Added!");
        this.router.navigate(['admin/products']);
      },
      error => {
        this.toastr.error("Not Added!");
        console.log(error);
      }
    );
  }

  updateProduct(product) {
    this.productService.updateProduct(product).subscribe(data => {
      if (data) {
        this.toastr.success("Successfully Updated!");
        this.router.navigate(['admin/products']);
      }
      else {
        this.toastr.error("Not Updated!");
      }
    });
  }

}
