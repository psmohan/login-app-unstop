import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) {}

  login(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userData');
  }

  logout(): void {
    localStorage.removeItem('userData');
  }
}
