import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categoryList$;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryList$ = this.categoryService.getCategories();
  }

}
