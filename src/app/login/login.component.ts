import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private sessionService: SessionStorageService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    let token = this.sessionService.getToken();
    if (token) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(loginForm) {
    this.authService.login(loginForm).subscribe(
      data => {
        this.directUser(data);
      },
      error => {
        this.toastr.error(error.error.message);
      });
  }

  directUser(data) {

    if (data) {
      this.sessionService.saveToken(data.accessToken);
      this.sessionService.saveUsername(data.username);
      this.sessionService.saveUserId(data.userId);
      this.router.navigateByUrl('');
    }
    else {
      this.toastr.error("Error");
    }
  }

}
