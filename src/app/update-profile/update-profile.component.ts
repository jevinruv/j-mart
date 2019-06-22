import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  isReadOnly = true;
  id: number;
  user: User = new User();

  constructor(
    private userService: UserService,
    private sessionService: SessionStorageService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.id = this.sessionService.getUserId();
    if (this.id) {
      this.userService.get(this.id).subscribe((data: User) => {
        this.user = data;
      });
    }
    else {
      this.isReadOnly = false;
    }
  }

  onSubmit() {

    this.userService.update(this.user).subscribe(
      data => {
        this.toastr.success("Successful!", "Success");
        this.isReadOnly = true;
      },
      error => {
        this.toastr.error("Unsuccessful!", "Error");
      });
  }

  edit() {
    this.isReadOnly = false;
  }

}
