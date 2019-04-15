import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

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
        // console.log(data);
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
      this.sessionService.saveAuthorities(data.authorities);

      this.router.navigateByUrl('');
    }
    else {
      this.toastr.error("Error");
    }
  }

}
