import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = "/api/categories";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[]>(this.API_URL);
  }
}
