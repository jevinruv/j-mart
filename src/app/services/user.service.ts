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

  get(id) {
    return this.http.get<User>(this.API_URL + `/${id}`);
  }

  update(user) {
    return this.http.put(this.API_URL, user);
  }

}
