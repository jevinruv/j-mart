import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivate } from '@angular/router';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    user: User;

    //constructor(private userService: UserService) { }

    canActivate() {
        this.user = JSON.parse(localStorage.getItem("loggedUser"));
        return (this.user && this.user.role == "ADMIN");
    }
}
