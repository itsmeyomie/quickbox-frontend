import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginDiagnosticService } from '../services/login-diagnostic.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="login-card" style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); max-width: 400px; width: 100%;">
        <h2 style="text-align: center; margin-bottom: 30px; color: #333;">QuickBox Login</h2>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group" style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Email or Phone</label>
            <input 
              type="text" 
              [(ngModel)]="emailOrPhone" 
              name="emailOrPhone" 
              required
              class="form-control"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
              placeholder="Enter email or phone">
          </div>
          
          <div class="form-group" style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 5px; color: #555; font-weight: 500;">Password</label>
            <input 
              type="password" 
              [(ngModel)]="password" 
              name="password" 
              required
              class="form-control"
              style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
              placeholder="Enter password">
          </div>
          
          <div *ngIf="error" style="color: #d32f2f; margin-bottom: 15px; font-size: 14px;">
            {{ error }}
          </div>
          
          <button 
            type="submit" 
            [disabled]="loading || !loginForm.valid"
            style="width: 100%; padding: 12px; background: #667eea; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: 600; cursor: pointer; transition: background 0.3s;"
            [style.background]="(loading || !loginForm.valid) ? '#ccc' : '#667eea'">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="/" style="color: #667eea; text-decoration: none; font-size: 14px;">Back to Home</a>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  emailOrPhone = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private diagnostic: LoginDiagnosticService
  ) {}

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    this.error = '';

    // Run diagnostic in background (for debugging)
    this.diagnostic.runDiagnostic(this.emailOrPhone, this.password).catch(err => {
      console.error('Diagnostic error:', err);
    });

    this.authService.login({
      emailOrPhone: this.emailOrPhone,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login successful, redirecting to:', this.authService.getRoleRoute());
        const route = this.authService.getRoleRoute();
        this.router.navigate([route]);
      },
      error: (err) => {
        this.loading = false;
        console.error('Login error:', err);
        this.error = err.message || 'Invalid credentials. Please try again.';
        console.log('Check browser console for detailed diagnostic information');
      }
    });
  }
}

