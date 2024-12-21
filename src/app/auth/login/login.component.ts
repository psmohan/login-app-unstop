import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^emilys$/)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') + '');

    if (userData && userData.accessToken) {
      this.router.navigate(['/home']);
    }
  }

  get username() {
    return this.loginForm.get('username');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleLogin(): void {
    // Guard clause: exit if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Prepare the login payload
    const payload = {
      username: this.username?.value,
      email: this.email?.value,
      password: this.password?.value,
      expiresInMins: 30,
    };

    // Call the login service
    this.authService.login(payload).subscribe(
      (data) => {
        // Check for the `accessToken` property
        if (data.accessToken) {
          // Store the entire user response, including both accessToken & refreshToken
          localStorage.setItem('userData', JSON.stringify(data));

          // Navigate to the home page
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        // Handle authentication error
        this.errors.api = 'Invalid login credentials.';
      }
    );
  }
}
