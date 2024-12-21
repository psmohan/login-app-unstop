import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if you have a stored access token or user data in localStorage:
    const userData = JSON.parse(localStorage.getItem('userData') + '');

    if (userData && userData.accessToken) {
      // User is logged in, proceed
      return true;
    } else {
      // User not logged in, redirect to login
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
