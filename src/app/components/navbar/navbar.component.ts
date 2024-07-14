import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  enCoursProjects: any[] = [];

  constructor(private router: Router, private aapApiService: AapApiService) {}

  ngOnInit() {
    this.getEnCoursProjects();
  }

  navigateToLogin() {
    this.router.navigateByUrl('/login');
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
}