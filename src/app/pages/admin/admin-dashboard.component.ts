import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Admin Dashboard</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
          <div class="kpi-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Total Orders</h3>
            <div style="font-size: 32px; font-weight: bold; color: #667eea;">{{ kpis?.totalOrders || 0 }}</div>
          </div>
          
          <div class="kpi-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Delivered</h3>
            <div style="font-size: 32px; font-weight: bold; color: #4caf50;">{{ kpis?.delivered || 0 }}</div>
          </div>
          
          <div class="kpi-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Failed</h3>
            <div style="font-size: 32px; font-weight: bold; color: #f44336;">{{ kpis?.failed || 0 }}</div>
          </div>
          
          <div class="kpi-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">COD Pending</h3>
            <div style="font-size: 32px; font-weight: bold; color: #ff9800;">{{ kpis?.codPending || 0 | number:'1.2-2' }}</div>
          </div>
          
          <div class="kpi-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Riders Active</h3>
            <div style="font-size: 32px; font-weight: bold; color: #2196f3;">{{ kpis?.ridersActive || 0 }}</div>
          </div>
          
          <div class="kpi-card" style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Pending Quotes</h3>
            <div style="font-size: 32px; font-weight: bold; color: #f15f22;">{{ kpis?.pendingQuotes || 0 }}</div>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="display: flex; gap: 15px; margin-bottom: 20px;">
            <a [routerLink]="['/admin']" style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Dashboard</a>
            <a [routerLink]="['/admin/users']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Users</a>
            <a [routerLink]="['/admin/quotes']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Quotes</a>
            <a [routerLink]="['/admin/video']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Video</a>
            <a [routerLink]="['/admin/reports']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Reports</a>
          </div>
          
          <button (click)="refreshKPIs()" style="padding: 10px 20px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">Refresh</button>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  kpis: any = null;
  currentUser: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadKPIs();
    // Auto-refresh every 60 seconds
    setInterval(() => this.loadKPIs(), 60000);
  }

  loadKPIs(): void {
    this.http.get(`${this.apiUrl}/admin/kpis`).subscribe({
      next: (data: any) => {
        this.kpis = data;
      },
      error: (err) => {
        console.error('Error loading KPIs:', err);
      }
    });
  }

  refreshKPIs(): void {
    this.loadKPIs();
  }

  logout(): void {
    this.authService.logout();
  }
}

