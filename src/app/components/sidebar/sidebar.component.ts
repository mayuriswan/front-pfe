import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isOpen = false;
  user: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  signOut(): void {
    this.authService.signOut();
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}