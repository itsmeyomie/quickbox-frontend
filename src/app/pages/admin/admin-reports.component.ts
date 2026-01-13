import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div class="filters">
          <input type="date" [(ngModel)]="fromDate" class="filter-input">
          <input type="date" [(ngModel)]="toDate" class="filter-input">
          <select [(ngModel)]="reportType" class="filter-select">
            <option value="orders">Orders Report</option>
            <option value="cod">COD Report</option>
          </select>
          <button (click)="loadReport()" class="btn-generate">Generate</button>
        </div>
      </div>
      
      <div class="content-card">
        <h3 class="card-title">{{ reportType === 'orders' ? 'Orders' : 'COD' }} Report</h3>
        <div *ngIf="reportData && reportData.length > 0">
          <table class="data-table">
            <thead>
              <tr>
                <th *ngFor="let header of getTableHeaders()">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of reportData">
                <td *ngFor="let header of getTableHeaders()">{{ getFieldValue(item, header) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div *ngIf="!reportData || reportData.length === 0" class="empty-state">
          No data available. Select filters and click Generate.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 0;
    }
    
    .page-header {
      margin-bottom: 20px;
    }
    
    .filters {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      align-items: center;
    }
    
    .filter-input, .filter-select {
      padding: 8px 12px;
      border: 1px solid #E1E1E1;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
    }
    
    .btn-generate {
      padding: 8px 16px;
      background: #f15f22;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .content-card {
      background: #FFFFFF;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    .card-title {
      margin: 0 0 15px 0;
      color: #050F24;
      font-size: 18px;
      font-weight: 600;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .data-table th {
      padding: 12px;
      text-align: left;
      border-bottom: 2px solid #E1E1E1;
      color: #050F24;
      font-weight: 600;
      font-size: 14px;
    }
    
    .data-table td {
      padding: 12px;
      border-bottom: 1px solid #F5F5F5;
      color: #050F24;
      font-size: 14px;
    }
    
    .empty-state {
      text-align: center;
      padding: 40px;
      color: #6F757E;
    }
  `]
})
export class AdminReportsComponent implements OnInit {
  reportType: string = 'orders';
  fromDate: string = '';
  toDate: string = '';
  reportData: any[] = [];
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
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

}

