import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_BASE_URL + '/auth';

  constructor(private http: HttpClient) { }

  loginUser(loginForm): Observable<User> {
    // let params = new HttpParams();
    // params = params.append("email", loginForm.email);
    // params = params.append("password", loginForm.password);

    //return this.http.get<User>(this.apiURL, { params: params });
    return this.http.post<User>(this.API_URL, 
      { email: loginForm.email, password: loginForm.password });
  }
}
