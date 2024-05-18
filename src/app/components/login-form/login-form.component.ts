import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AapApiService } from 'src/app/services/aap-api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements AfterViewInit {
  firstname: string = '';
  lastname: string = '';
  phone: string = '';
  email: string = '';
  password: string = '';
  signinEmail: string = '';
  signinPassword: string = '';
  emailError: boolean = false;
  emailErrorFade: boolean = false;

  constructor(private elementRef: ElementRef, private router: Router, private apiService: AapApiService) {}

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

  onSubmitSignup() {
    const newUser = {
      firstname: this.firstname,
      lastname: this.lastname,
      phone: this.phone,
      email: this.email,
      password: this.password,
      role: 0 // Set role to 0
    };

    this.apiService.addUser(newUser).subscribe(
      response => {
        console.log('User created successfully', response);
        this.router.navigateByUrl('/home');
      },
      error => {
        if (error === 'Email already exists') {
          this.emailError = true; // Set error flag
          this.emailErrorFade = false; // Reset fade class
          setTimeout(() => {
            this.emailErrorFade = true; // Add fade class
          }, 0);
          setTimeout(() => {
            this.emailError = false; // Hide error after 3 seconds
          }, 3000);
        } else {
          console.error('Error creating user', error);
        }
      }
    );
  }

  onSubmitSignin() {
    // Sign-in logic here
  }
}
