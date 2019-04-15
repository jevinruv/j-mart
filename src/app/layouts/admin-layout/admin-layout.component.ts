import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  isNavbarCollapsed;
  username: string;
  authority: string;

  constructor(
    private tokenService: SessionStorageService,
  ) { }

  ngOnInit() {
    this.username = this.tokenService.getUsername();
    this.authority = this.tokenService.getAuthority();
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  logout() {
    this.tokenService.signout();
    window.location.reload();
  }

}
