import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = "/api/users";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.API_URL)
  }



}
