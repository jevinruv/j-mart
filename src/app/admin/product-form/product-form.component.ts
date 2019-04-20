import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {

  product: Product = new Product();
  categoryList: Category[] = [];
  id: string;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.categoryService.getAll().subscribe(data => {
      this.categoryList = data;
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id).subscribe(data => {
        this.product = data;
        // console.log(data);
      });
    }

  }

  compareByOptionId(idFirst, idSecond) {
    return idFirst && idSecond && idFirst.id == idSecond.id;
  }

  onSubmit() {
    console.log(this.product);

    this.productService.addOrUpdate(this.product).subscribe(
      data => {
        // console.log(data);
        this.toastr.success("Successful!");
        this.router.navigate(['admin/products']);
      },
      error => {
        // console.log(error);
        this.toastr.error("UnSuccessful!");
      }
    );

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

}
