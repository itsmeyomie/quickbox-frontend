import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-quotes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="min-height: 100vh; background: #f5f5f5; padding: 20px;">
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
          <h1 style="color: #333;">Quote Requests</h1>
          <div>
            <span style="margin-right: 15px;">{{ currentUser?.fullName || currentUser?.email }}</span>
            <button (click)="logout()" style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Logout</button>
          </div>
        </div>
        
        <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="display: flex; gap: 15px; margin-bottom: 20px;">
            <a [routerLink]="['/admin']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Dashboard</a>
            <a [routerLink]="['/admin/users']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Users</a>
            <a [routerLink]="['/admin/quotes']" style="padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Quotes</a>
            <a [routerLink]="['/admin/reports']" style="padding: 10px 20px; background: #e0e0e0; color: #333; text-decoration: none; border-radius: 5px;">Reports</a>
          </div>
          
          <div style="display: flex; gap: 10px; margin-bottom: 20px;">
            <button (click)="loadQuotes('PENDING')" 
                    [style.background]="filterStatus === 'PENDING' ? '#f15f22' : '#e0e0e0'"
                    [style.color]="filterStatus === 'PENDING' ? 'white' : '#333'"
                    style="padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
              Pending ({{ pendingCount }})
            </button>
            <button (click)="loadQuotes('PROCESSING')" 
                    [style.background]="filterStatus === 'PROCESSING' ? '#f15f22' : '#e0e0e0'"
                    [style.color]="filterStatus === 'PROCESSING' ? 'white' : '#333'"
                    style="padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
              Processing
            </button>
            <button (click)="loadQuotes('QUOTED')" 
                    [style.background]="filterStatus === 'QUOTED' ? '#f15f22' : '#e0e0e0'"
                    [style.color]="filterStatus === 'QUOTED' ? 'white' : '#333'"
                    style="padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
              Quoted
            </button>
            <button (click)="loadQuotes('ALL')" 
                    [style.background]="filterStatus === 'ALL' ? '#f15f22' : '#e0e0e0'"
                    [style.color]="filterStatus === 'ALL' ? 'white' : '#333'"
                    style="padding: 8px 16px; border: none; border-radius: 5px; cursor: pointer;">
              All
            </button>
            <button (click)="refreshQuotes()" style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: auto;">
              Refresh
            </button>
          </div>
          
          <div *ngIf="loading" style="text-align: center; padding: 40px;">
            <div>Loading quotes...</div>
          </div>
          
          <div *ngIf="!loading && quotes.length === 0" style="text-align: center; padding: 40px; color: #999;">
            No quotes found
          </div>
          
          <div *ngIf="!loading && quotes.length > 0" style="display: grid; gap: 15px;">
            <div *ngFor="let quote of quotes" 
                 style="border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #fafafa;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                <div>
                  <h3 style="margin: 0 0 5px 0; color: #333; font-size: 18px;">{{ quote.name }}</h3>
                  <div style="color: #666; font-size: 14px;">
                    <div>📧 {{ quote.email }}</div>
                    <div>📞 {{ quote.contactNumber }}</div>
                    <div>📅 {{ quote.createdAt | date:'medium' }}</div>
                  </div>
                </div>
                <div>
                  <span [style.background]="getStatusColor(quote.status)" 
                        style="padding: 5px 15px; border-radius: 20px; color: white; font-size: 12px; font-weight: 600;">
                    {{ quote.status }}
                  </span>
                </div>
              </div>
              
              <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; font-size: 14px;">
                  <div *ngIf="quote.serviceType">
                    <strong>Service:</strong> {{ quote.serviceType }}
                  </div>
                  <div *ngIf="quote.pickupLocation">
                    <strong>Pickup:</strong> {{ quote.pickupLocation }}
                  </div>
                  <div *ngIf="quote.deliveryDestination">
                    <strong>Delivery:</strong> {{ quote.deliveryDestination }}
                  </div>
                  <div *ngIf="quote.packageWeight">
                    <strong>Weight:</strong> {{ quote.packageWeight }}
                  </div>
                  <div *ngIf="quote.additionalServices">
                    <strong>Additional:</strong> {{ quote.additionalServices }}
                  </div>
                </div>
              </div>
              
              <div style="display: flex; gap: 10px;">
                <button *ngIf="quote.status === 'PENDING'" 
                        (click)="updateStatus(quote.id, 'PROCESSING')" 
                        style="padding: 8px 16px; background: #2196f3; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  Mark Processing
                </button>
                <button *ngIf="quote.status === 'PROCESSING'" 
                        (click)="updateStatus(quote.id, 'QUOTED')" 
                        style="padding: 8px 16px; background: #4caf50; color: white; border: none; border-radius: 5px; cursor: pointer;">
                  Mark Quoted
                </button>
                <a [href]="'mailto:' + quote.email" 
                   style="padding: 8px 16px; background: #f15f22; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Reply via Email
                </a>
                <button (click)="deleteQuote(quote.id)" 
                        style="padding: 8px 16px; background: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: auto;">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminQuotesComponent implements OnInit {
  quotes: any[] = [];
  loading = false;
  filterStatus = 'PENDING';
  pendingCount = 0;
  currentUser: any = null;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadQuotes('PENDING');
  }

  loadQuotes(status: string): void {
    this.loading = true;
    this.filterStatus = status;
    
    const url = status === 'ALL' 
      ? `${this.apiUrl}/quotes`
      : `${this.apiUrl}/quotes/status/${status}`;
    
    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.quotes = response.data;
        } else {
          this.quotes = [];
        }
        this.loading = false;
        this.loadPendingCount();
      },
      error: (err) => {
        console.error('Error loading quotes:', err);
        this.quotes = [];
        this.loading = false;
      }
    });
  }

  loadPendingCount(): void {
    this.http.get<any>(`${this.apiUrl}/quotes/status/PENDING`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.pendingCount = response.data.length;
        }
      },
      error: () => {
        this.pendingCount = 0;
      }
    });
  }

  updateStatus(id: number, status: string): void {
    this.http.put<any>(`${this.apiUrl}/quotes/${id}/status?status=${status}`, {}).subscribe({
      next: () => {
        this.loadQuotes(this.filterStatus);
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update status');
      }
    });
  }

  deleteQuote(id: number): void {
    if (confirm('Are you sure you want to delete this quote?')) {
      this.http.delete<any>(`${this.apiUrl}/quotes/${id}`).subscribe({
        next: () => {
          this.loadQuotes(this.filterStatus);
        },
        error: (err) => {
          console.error('Error deleting quote:', err);
          alert('Failed to delete quote');
        }
      });
    }
  }

  refreshQuotes(): void {
    this.loadQuotes(this.filterStatus);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return '#ff9800';
      case 'PROCESSING': return '#2196f3';
      case 'QUOTED': return '#4caf50';
      case 'ACCEPTED': return '#4caf50';
      case 'REJECTED': return '#f44336';
      default: return '#999';
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
