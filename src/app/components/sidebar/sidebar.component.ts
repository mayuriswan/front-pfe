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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

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
