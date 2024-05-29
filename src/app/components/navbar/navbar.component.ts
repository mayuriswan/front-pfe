import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  isAccueilPage() {
    return this.router.url === '/accueil' || this.router.url === '/';
  }

  isLoginPage() {
    return this.router.url === '/login';
  }
}
