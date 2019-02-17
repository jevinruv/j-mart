import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtResponse } from '../models/jwt-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_BASE_URL + '/auth';

  constructor(private http: HttpClient) { }

  login(loginForm): Observable<JwtResponse> {

    return this.http.post<JwtResponse>(this.API_URL + '/signin', { username: loginForm.username, password: loginForm.password });
  }

  register(registerForm): Observable<string> {

    registerForm.role = ['user'];

    return this.http.post<string>(this.API_URL + '/signup', registerForm);
  }




}
