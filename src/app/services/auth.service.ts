import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://localhost:7171/api/users/authenticate';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.authUrl, { email, password }).pipe(
      map(response => {
        // Store the user information in local storage
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/home']); // Redirect to home after login
        return response;
      })
    );
  }


  getUserInfo(): any {
    // Retrieve the user information from local storage or API response
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
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
