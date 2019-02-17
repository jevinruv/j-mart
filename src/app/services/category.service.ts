import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = environment.API_BASE_URL + '/categories';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<[]>(this.API_URL);
  }
}
