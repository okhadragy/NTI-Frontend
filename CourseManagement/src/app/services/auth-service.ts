import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:5000/users';
  private tokenKey = 'auth_token';

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  signup(userData: SignupData): Observable<any> {
    if (this.isLoggedIn()) {
      return throwError(() => new Error('You are already logged in.'));
    }
    return this.http.post<{ token: string }>(`${this.URL}/signup`, userData).pipe(
      map(res => {
        this.setToken(res.token);
        return res;
      }),
      catchError(err => throwError(() => new Error(err.error?.message || 'Signup failed')))
    );
  }

  login(credentials: LoginData): Observable<any> {
    if (this.isLoggedIn()) {
      return throwError(() => new Error('You are already logged in.'));
    }
    return this.http.post<{ token: string }>(`${this.URL}/login`, credentials).pipe(
      map(res => {
        this.setToken(res.token);
        return res;
      }),
      catchError(err => throwError(() => new Error(err.error?.message || 'Login failed')))
    );
  }

  logout(): Observable<boolean> {
    if (!this.isLoggedIn()) {
      return throwError(() => new Error('You are not logged in.'));
    }
    this.removeToken();
    return of(true);
  }
}
