import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.redirectUser(user.role);
    } else {
      this.router.navigate(['/login']);
    }
  }

  redirectUser(role: number): void {
    if (role === 0) {
      this.router.navigate(['/evaluator-home']);
    } else if (role === 3) {
      this.router.navigate(['/responsible-home']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
