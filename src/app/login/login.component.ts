import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    let token = this.tokenStorage.getToken();
    if (token) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(loginForm) {
    this.authService.login(loginForm)
      .subscribe(
        data => {
          this.directUser(data);
        },
        error => {
          console.log(error.error.message)
          this.toastr.error(error.error.message);
        });
  }

  directUser(data) {

    if (data) {

      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUsername(data.username);
      this.tokenStorage.saveAuthorities(data.authorities);

      switch (this.tokenStorage.getAuthority()) {

        case 'ROLE_ADMIN':
          this.router.navigateByUrl('admin/home');
          break;
        case 'ROLE_USER':
          this.router.navigateByUrl('');
          break;
        default:
          this.router.navigateByUrl('/login');
          break;
      }
    }
    else {
      this.toastr.error("Error");
    }
  }

}
