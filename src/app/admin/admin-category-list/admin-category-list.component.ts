import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category-list',
  templateUrl: './admin-category-list.component.html',
  styleUrls: ['./admin-category-list.component.css']
})
export class AdminCategoryListComponent implements OnInit {

  itemCategoryList = [];
  filteredCategoryList = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {

    this.categoryService.getAll().subscribe(data => {
      // console.log(data);
      this.filteredCategoryList = this.itemCategoryList = data;
    });
  }

  filter(query: string) {
    this.filteredCategoryList = (query) ?
      this.itemCategoryList.filter(rawItem => rawItem.name.toLowerCase().includes(query.toLocaleLowerCase())) :
      this.itemCategoryList;
  }

}
