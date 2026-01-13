import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="kpi-grid">
        <div class="kpi-card">
          <h3 class="kpi-label">Total Orders</h3>
          <div class="kpi-value" style="color: #667eea;">{{ kpis?.totalOrders || 0 }}</div>
        </div>
        
        <div class="kpi-card">
          <h3 class="kpi-label">Delivered</h3>
          <div class="kpi-value" style="color: #4caf50;">{{ kpis?.delivered || 0 }}</div>
        </div>
        
        <div class="kpi-card">
          <h3 class="kpi-label">Failed</h3>
          <div class="kpi-value" style="color: #f44336;">{{ kpis?.failed || 0 }}</div>
        </div>
        
        <div class="kpi-card">
          <h3 class="kpi-label">COD Pending</h3>
          <div class="kpi-value" style="color: #ff9800;">{{ kpis?.codPending || 0 | number:'1.2-2' }}</div>
        </div>
        
        <div class="kpi-card">
          <h3 class="kpi-label">Riders Active</h3>
          <div class="kpi-value" style="color: #2196f3;">{{ kpis?.ridersActive || 0 }}</div>
        </div>
        
        <div class="kpi-card">
          <h3 class="kpi-label">Pending Quotes</h3>
          <div class="kpi-value" style="color: #f15f22;">{{ kpis?.pendingQuotes || 0 }}</div>
        </div>
      </div>
      
      <div class="action-card">
        <button (click)="refreshKPIs()" class="refresh-btn">Refresh</button>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 0;
    }
    
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .kpi-card {
      background: #FFFFFF;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    }
    
    .kpi-label {
      color: #6F757E;
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 10px 0;
    }
    
    .kpi-value {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
    }
    
    .action-card {
      background: #FFFFFF;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    .refresh-btn {
      padding: 10px 20px;
      background: #f15f22;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s;
    }
    
    .refresh-btn:hover {
      background: #d14a1a;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  kpis: any = null;
  currentUser: any = null;

  constructor(
    private dataService: DataService,
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
    this.dataService.getAdminKPIs().subscribe({
      next: (data) => {
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
}

