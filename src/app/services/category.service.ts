import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  API_URL = environment.API_BASE_URL + '/category';

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<[]>(this.API_URL).pipe(map(data => data['content']));
  }
}
