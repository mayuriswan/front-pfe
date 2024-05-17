import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  isOpen = false;


  ngOnInit(): void {
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  constructor(private router: Router) {}

  signOut() {
    this.router.navigateByUrl('/');
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
  }

}
