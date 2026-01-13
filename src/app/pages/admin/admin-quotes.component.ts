import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FirebaseDataService } from '../../services/firebase-data.service';

@Component({
  selector: 'app-admin-quotes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div class="filter-buttons">
          <button (click)="loadQuotes('PENDING')" 
                  [class.active]="filterStatus === 'PENDING'"
                  class="filter-btn">
            Pending ({{ pendingCount }})
          </button>
          <button (click)="loadQuotes('PROCESSING')" 
                  [class.active]="filterStatus === 'PROCESSING'"
                  class="filter-btn">
            Processing
          </button>
          <button (click)="loadQuotes('QUOTED')" 
                  [class.active]="filterStatus === 'QUOTED'"
                  class="filter-btn">
            Quoted
          </button>
          <button (click)="loadQuotes('ALL')" 
                  [class.active]="filterStatus === 'ALL'"
                  class="filter-btn">
            All
          </button>
          <button (click)="refreshQuotes()" class="refresh-btn">Refresh</button>
        </div>
      </div>
      
      <div class="content-card">
        <div *ngIf="loading" class="loading-state">
          <div>Loading quotes...</div>
        </div>
        
        <div *ngIf="!loading && quotes.length === 0" class="empty-state">
          No quotes found
        </div>
        
        <div *ngIf="!loading && quotes.length > 0" class="quotes-list">
          <div *ngFor="let quote of quotes" class="quote-card">
            <div class="quote-header">
              <div>
                <h3 class="quote-name">{{ quote.name }}</h3>
                <div class="quote-meta">
                  <div>📧 {{ quote.email }}</div>
                  <div>📞 {{ quote.contactNumber }}</div>
                  <div>📅 {{ quote.createdAt | date:'medium' }}</div>
                </div>
              </div>
              <div>
                <span class="status-badge" [style.background]="getStatusColor(quote.status)">
                  {{ quote.status }}
                </span>
              </div>
            </div>
            
            <div class="quote-details">
              <div class="detail-grid">
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
            
            <div class="quote-actions">
              <button *ngIf="quote.status === 'PENDING'" 
                      (click)="updateStatus(quote.id, 'PROCESSING')" 
                      class="btn-processing">
                Mark Processing
              </button>
              <button *ngIf="quote.status === 'PROCESSING'" 
                      (click)="updateStatus(quote.id, 'QUOTED')" 
                      class="btn-quoted">
                Mark Quoted
              </button>
              <a [href]="'mailto:' + quote.email" class="btn-email">
                Reply via Email
              </a>
              <button (click)="deleteQuote(quote.id)" class="btn-delete">
                Delete
              </button>
            </div>
          </div>
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
    
    .filter-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 8px 16px;
      background: #E1E1E1;
      color: #050F24;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
    }
    
    .filter-btn.active {
      background: #f15f22;
      color: white;
    }
    
    .refresh-btn {
      padding: 8px 16px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-left: auto;
      font-weight: 500;
    }
    
    .content-card {
      background: #FFFFFF;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    .loading-state, .empty-state {
      text-align: center;
      padding: 40px;
      color: #6F757E;
    }
    
    .quotes-list {
      display: grid;
      gap: 15px;
    }
    
    .quote-card {
      border: 1px solid #E1E1E1;
      padding: 20px;
      border-radius: 12px;
      background: #FAFAFA;
    }
    
    .quote-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 15px;
    }
    
    .quote-name {
      margin: 0 0 5px 0;
      color: #050F24;
      font-size: 18px;
      font-weight: 600;
    }
    
    .quote-meta {
      color: #6F757E;
      font-size: 14px;
    }
    
    .status-badge {
      padding: 5px 15px;
      border-radius: 20px;
      color: white;
      font-size: 12px;
      font-weight: 600;
    }
    
    .quote-details {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }
    
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      font-size: 14px;
    }
    
    .quote-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .btn-processing {
      padding: 8px 16px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .btn-quoted {
      padding: 8px 16px;
      background: #4caf50;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    
    .btn-email {
      padding: 8px 16px;
      background: #f15f22;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      display: inline-block;
      font-size: 14px;
    }
    
    .btn-delete {
      padding: 8px 16px;
      background: #F54F5F;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin-left: auto;
      font-size: 14px;
    }
  `]
})
export class AdminQuotesComponent implements OnInit {
  quotes: any[] = [];
  loading = false;
  filterStatus = 'PENDING';
  pendingCount = 0;

  constructor(
    private firebaseData: FirebaseDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadQuotes('PENDING');
  }

  async loadQuotes(status: string): Promise<void> {
    this.loading = true;
    this.filterStatus = status;
    
    try {
      const quotes = await this.firebaseData.getQuotes(status === 'ALL' ? undefined : status);
      this.quotes = quotes;
      this.loadPendingCount();
    } catch (err) {
      console.error('Error loading quotes:', err);
      this.quotes = [];
    } finally {
      this.loading = false;
    }
  }

  async loadPendingCount(): Promise<void> {
    try {
      const pending = await this.firebaseData.getQuotes('PENDING');
      this.pendingCount = pending.length;
    } catch {
      this.pendingCount = 0;
    }
  }

  async updateStatus(id: string, status: string): Promise<void> {
    try {
      await this.firebaseData.updateQuoteStatus(id, status);
      await this.loadQuotes(this.filterStatus);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  }

  async deleteQuote(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this quote?')) {
      try {
        await this.firebaseData.deleteQuote(id);
        await this.loadQuotes(this.filterStatus);
      } catch (err) {
        console.error('Error deleting quote:', err);
        alert('Failed to delete quote');
      }
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

}
