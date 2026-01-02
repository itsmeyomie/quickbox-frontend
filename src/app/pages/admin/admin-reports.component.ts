import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Reports</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
          <div style="display: flex; gap: 15px; margin-bottom: 20px;">
            <a [routerLink]="['/admin']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Dashboard</a>
            <a [routerLink]="['/admin/users']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Users</a>
            <a [routerLink]="['/admin/reports']" style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Reports</a>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
            <input type="date" [(ngModel)]="fromDate" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            <input type="date" [(ngModel)]="toDate" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
            <select [(ngModel)]="reportType" style="padding: 8px; border: 1px solid #ddd; border-radius: 5px;">
              <option value="orders">Orders Report</option>
              <option value="cod">COD Report</option>
            </select>
            <button (click)="loadReport()" style="padding: 8px 16px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Generate</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h3 style="margin-bottom: 15px;">{{ reportType === 'orders' ? 'Orders' : 'COD' }} Report</h3>
          <div *ngIf="reportData && reportData.length > 0">
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #ddd;">
                  <th *ngFor="let header of getTableHeaders()" style="padding: 12px; text-align: left;">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of reportData" style="border-bottom: 1px solid #eee;">
                  <td *ngFor="let header of getTableHeaders()" style="padding: 12px;">{{ getFieldValue(item, header) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div *ngIf="!reportData || reportData.length === 0" style="text-align: center; padding: 40px; color: #999;">
            No data available. Select filters and click Generate.
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminReportsComponent implements OnInit {
  reportType: string = 'orders';
  fromDate: string = '';
  toDate: string = '';
  reportData: any[] = [];
  currentUser: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    const today = new Date();
    this.toDate = today.toISOString().split('T')[0];
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    this.fromDate = weekAgo.toISOString().split('T')[0];
  }

  loadReport(): void {
    const params: any = {};
    if (this.fromDate) params.from = this.fromDate + 'T00:00:00';
    if (this.toDate) params.to = this.toDate + 'T23:59:59';
    
    const url = this.reportType === 'orders'
      ? `${this.apiUrl}/admin/reports/orders`
      : `${this.apiUrl}/admin/reports/cod`;
    
    this.http.get<any[]>(url, { params }).subscribe({
      next: (data) => {
        this.reportData = data;
      },
      error: (err) => {
        console.error('Error loading report:', err);
      }
    });
  }

  getTableHeaders(): string[] {
    if (this.reportType === 'orders') {
      return ['Tracking Code', 'Status', 'Client', 'Rider', 'Created At'];
    } else {
      return ['Order', 'Amount', 'Status', 'Rider', 'Client', 'Collected At'];
    }
  }

  getFieldValue(item: any, header: string): string {
    const mapping: any = {
      'Tracking Code': item.trackingCode,
      'Status': item.status,
      'Client': item.client?.email || 'N/A',
      'Rider': item.rider?.email || 'N/A',
      'Created At': item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A',
      'Order': item.order?.trackingCode || 'N/A',
      'Amount': item.amount ? item.amount.toFixed(2) : '0.00',
      'Collected At': item.collectedAt ? new Date(item.collectedAt).toLocaleString() : 'N/A'
    };
    return mapping[header] || 'N/A';
  }

  logout(): void {
    this.authService.logout();
  }
}

