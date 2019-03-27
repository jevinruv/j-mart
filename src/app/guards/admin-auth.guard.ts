
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private sessionService: SessionStorageService
    ) { }

    canActivate() {

        let authority = this.sessionService.getAuthority();

        if (authority && authority == "ROLE_ADMIN") {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
