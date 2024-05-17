import { Component, ElementRef, AfterViewInit } from '@angular/core'; // Import AfterViewInit

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements AfterViewInit { // Implement AfterViewInit interface
  constructor(private elementRef: ElementRef, private router: Router) {}

  ngAfterViewInit() {
    const signUpButton = this.elementRef.nativeElement.querySelector('#signUp');
    const signInButton = this.elementRef.nativeElement.querySelector('#signIn');
    const container = this.elementRef.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
