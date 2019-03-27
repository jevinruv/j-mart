import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private sessionService: SessionStorageService,
    private router: Router) { }

  ngOnInit() {
    let token = this.sessionService.getToken();
    if (token) {
      this.router.navigateByUrl('');
    }
  }

  onSubmit(registerForm) {
    this.authService.register(registerForm).subscribe(
      data => {
        this.toastr.success(data);
        this.router.navigateByUrl('/login');
      },
      error => {
        console.log(error);
        this.toastr.error(error.error.message);
      }
    );
  }

}
