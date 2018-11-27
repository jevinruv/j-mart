import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

    if (loggedUser) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(loginForm){
    this.authService.loginUser(loginForm)
      .subscribe(data => {
        this.directUser(data);
      })
  }

  directUser(loggedUser) {

    if (loggedUser) {
      switch (loggedUser.Role) {
        case 'Admin':
          this.router.navigateByUrl('admin/home');
          break;
        default:
          this.router.navigateByUrl('');
          break;
      }
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }
    else {
      this.toastr.error("Invalid Credentials");
    }
  }

}
