import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionStorageService
  ) { }

  canActivate() {

    let username = this.sessionService.getUsername();

    if (username) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
