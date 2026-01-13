// This service is now a wrapper around FirebaseAuthService for backward compatibility
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { FirebaseAuthService, LoginResponse, UserData } from './firebase-auth.service';
import { LoginRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firebaseAuth: FirebaseAuthService,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return from(this.firebaseAuth.login(credentials.emailOrPhone, credentials.password));
  }

  logout(): void {
    this.firebaseAuth.logout();
  }

  getToken(): Promise<string | null> {
    return this.firebaseAuth.getToken();
  }

  getCurrentUser(): LoginResponse | null {
    const user = this.firebaseAuth.getCurrentUserSync();
    if (!user) return null;
    return {
      token: '', // Firebase handles tokens internally
      user: user,
      role: user.role
    };
  }

  isAuthenticated(): boolean {
    return this.firebaseAuth.isAuthenticated();
  }

  hasRole(role: string): boolean {
    return this.firebaseAuth.hasRole(role);
  }

  getRoleRoute(): string {
    return this.firebaseAuth.getRoleRoute();
  }
}


