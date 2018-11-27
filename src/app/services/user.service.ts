import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = environment.API_BASE_URL + '/user';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.API_URL)
  }



}
