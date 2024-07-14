import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7171/api/users/authenticate';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, returnUrl?: string) {
    return this.http.post<any>(this.authUrl, { email, password }).subscribe(
      response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        const redirectUrl = returnUrl || '/home';
        this.router.navigate([redirectUrl]); // Redirect to returnUrl or home after login
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  logout() {
    this.signOut();
  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
