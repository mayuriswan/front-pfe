import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';
import { AuthService } from 'src/app/services/auth.service';  // Import AuthService

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  enCoursProjects: any[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private aapApiService: AapApiService,
    private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit() {
    this.getEnCoursProjects();
    this.checkLoginStatus();  // Check login status on initialization
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }

  navigateToDashboard() {
    const user = this.authService.getCurrentUser();
    console.log(user.role);

    if (user.role === 0) {
      this.router.navigateByUrl('/evaluator-home');
    } else if (user.role === 1) {
      this.router.navigateByUrl('/home');
    } else if (user.role === 2) {
      this.router.navigateByUrl('/responsible-home');
    }
  }

  isAccueilPage() {
    return this.router.url === '/accueil' || this.router.url === '/';
  }

  isLoginPage() {
    return this.router.url === '/login';
  }

  getEnCoursProjects() {
    this.aapApiService.getProjects().subscribe(
      (projects) => {
        this.enCoursProjects = projects.filter((project) => project.isPublic);
      },
      (error) => {
        console.error('Error fetching en cours projects:', error);
      }
    );
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
