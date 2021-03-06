import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = "/api/categories";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Category[]>(this.API_URL);
  }

  get(id) {
    return this.http.get<Category>(this.API_URL + `/${id}`);
  }

  addOrUpdate(category) {
    return this.http.post(this.API_URL, category);
  }
}
