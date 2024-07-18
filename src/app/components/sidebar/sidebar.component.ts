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
  isAdmin: boolean = false;
  isUserManager: boolean = false;
  isEvaluator = false;
  isResponsible = false;  


  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log(this.user);
    this.checkUserRoles();
  }

  checkUserRoles(): void {
    if (this.user) {
      this.isAdmin = this.user.role === 1; // Assuming role 1 is admin
      this.isEvaluator = this.user?.role === 0;
      this.isResponsible = this.user?.role === 3;
    }
  }
  navigateToHome() {
    if (this.isAdmin) {
      this.router.navigate(['/home']);
    } else if (this.isEvaluator) {
      this.router.navigate(['/evaluator-home']);
      console.log('evaluator');
    }else if(this.isResponsible){
      this.router.navigate(['/responsible-home']);
    } 
    else {
      this.router.navigate(['/home']);
    }
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
