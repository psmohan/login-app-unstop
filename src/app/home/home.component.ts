import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
  }

  logout() {
    // Clear localStorage or remove userData
    localStorage.removeItem('userData');
    // Navigate back to login (or wherever you choose)
    this.router.navigate(['/auth/login']);
  }
}
