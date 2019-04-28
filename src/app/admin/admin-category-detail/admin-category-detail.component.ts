import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-admin-category-detail',
  templateUrl: './admin-category-detail.component.html',
  styleUrls: ['./admin-category-detail.component.css']
})
export class AdminCategoryDetailComponent implements OnInit {

  category: Category = new Category();
  isReadOnly = true;
  id: string;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.categoryService.get(this.id).subscribe(data => {
        this.category = data;
        // console.log(data)
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.categoryService.addOrUpdate(this.category).subscribe(data => {
      // console.log(data);
      this.isReadOnly = true;
    });
  }

  edit() {
    this.isReadOnly = !this.isReadOnly;
  }

}
