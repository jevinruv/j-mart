import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    user: User;

    constructor(private router: Router) { }

    canActivate() {
        this.user = JSON.parse(localStorage.getItem("loggedUser"));
        if (this.user && this.user.role == "ADMIN")
            return true;
        this.router.navigate(['/']);
        return false;
    }
}
