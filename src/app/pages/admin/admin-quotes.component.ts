import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FirebaseSyncService } from '../../services/firebase-sync.service';
import { FirebaseDataService } from '../../services/firebase-data.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-quotes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div class="tabs">
          <button (click)="activeTab = 'quotes'" 
                  [class.active]="activeTab === 'quotes'"
                  class="tab-btn">
            Quote Requests ({{ allQuotes.length }})
          </button>
          <button (click)="activeTab = 'contacts'" 
                  [class.active]="activeTab === 'contacts'"
                  class="tab-btn">
            Contacts ({{ allContacts.length }})
          </button>
        </div>
      </div>

      <!-- Quotes Tab -->
      <div *ngIf="activeTab === 'quotes'" class="tab-content">
        <div class="page-header">
          <div class="filter-buttons">
            <button (click)="setFilter('PENDING')" 
                    [class.active]="filterStatus === 'PENDING'"
                    class="filter-btn">
              Pending ({{ pendingCount }})
            </button>
            <button (click)="setFilter('PROCESSING')" 
                    [class.active]="filterStatus === 'PROCESSING'"
                    class="filter-btn">
              Processing
            </button>
            <button (click)="setFilter('QUOTED')" 
                    [class.active]="filterStatus === 'QUOTED'"
                    class="filter-btn">
              Quoted
            </button>
            <button (click)="setFilter('ALL')" 
                    [class.active]="filterStatus === 'ALL'"
                    class="filter-btn">
              All
            </button>
          <button (click)="refreshQuotes()" class="refresh-btn">Refresh</button>
          <button (click)="debugInfo()" class="debug-btn">Debug Info</button>
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
                    <div>📅 {{ formatDate(quote.createdAt) }}</div>
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
                        (click)="updateStatus(getQuoteId(quote), 'PROCESSING')" 
                        class="btn-processing">
                  Mark Processing
                </button>
                <button *ngIf="quote.status === 'PROCESSING'" 
                        (click)="updateStatus(getQuoteId(quote), 'QUOTED')" 
                        class="btn-quoted">
                  Mark Quoted
                </button>
                <a [href]="'mailto:' + quote.email" class="btn-email">
                  Reply via Email
                </a>
                <button (click)="deleteQuote(getQuoteId(quote))" class="btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contacts Tab -->
      <div *ngIf="activeTab === 'contacts'" class="tab-content">
        <div class="content-card">
          <div *ngIf="loading" class="loading-state">
            <div>Loading contacts...</div>
          </div>
          
          <div *ngIf="!loading && contacts.length === 0" class="empty-state">
            No contacts found
          </div>
          
          <div *ngIf="!loading && contacts.length > 0" class="contacts-list">
            <div *ngFor="let contact of contacts" class="contact-card">
              <div class="contact-header">
                <div>
                  <h3 class="contact-name">{{ contact.name }}</h3>
                  <div class="contact-meta">
                    <div>📧 {{ contact.email }}</div>
                    <div *ngIf="contact.phone">📞 {{ contact.phone }}</div>
                    <div>📅 {{ formatDate(contact.createdAt) }}</div>
                    <div *ngIf="contact.subject">
                      <strong>Subject:</strong> {{ contact.subject }}
                    </div>
                  </div>
                </div>
                <div>
                  <span class="read-badge" [class.unread]="!contact.read">
                    {{ contact.read ? 'Read' : 'Unread' }}
                  </span>
                </div>
              </div>
              
              <div class="contact-message" *ngIf="contact.message">
                <strong>Message:</strong>
                <p>{{ contact.message }}</p>
              </div>
              
              <div class="contact-actions">
                <a [href]="'mailto:' + contact.email" class="btn-email">
                  Reply via Email
                </a>
                <button *ngIf="!contact.read" 
                        (click)="markContactRead(contact.id)" 
                        class="btn-mark-read">
                  Mark as Read
                </button>
              </div>
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

    .debug-btn {
      padding: 8px 16px;
      background: #9c27b0;
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

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .tab-btn {
      padding: 10px 20px;
      background: #E1E1E1;
      color: #050F24;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
    }

    .tab-btn.active {
      background: #f15f22;
      color: white;
    }

    .tab-content {
      margin-top: 20px;
    }

    .contacts-list {
      display: grid;
      gap: 15px;
    }

    .contact-card {
      border: 1px solid #E1E1E1;
      padding: 20px;
      border-radius: 12px;
      background: #FAFAFA;
    }

    .contact-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 15px;
    }

    .contact-name {
      margin: 0 0 5px 0;
      color: #050F24;
      font-size: 18px;
      font-weight: 600;
    }

    .contact-meta {
      color: #6F757E;
      font-size: 14px;
    }

    .read-badge {
      padding: 5px 15px;
      border-radius: 20px;
      color: white;
      font-size: 12px;
      font-weight: 600;
      background: #4caf50;
    }

    .read-badge.unread {
      background: #ff9800;
    }

    .contact-message {
      background: white;
      padding: 15px;
      border-radius: 8px;
      margin-bottom: 15px;
    }

    .contact-message p {
      margin: 10px 0 0 0;
      color: #050F24;
      line-height: 1.6;
    }

    .contact-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn-mark-read {
      padding: 8px 16px;
      background: #2196f3;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
  `]
})
export class AdminQuotesComponent implements OnInit, OnDestroy {
  quotes: any[] = [];
  allQuotes: any[] = [];
  contacts: any[] = [];
  allContacts: any[] = [];
  loading = false;
  filterStatus = 'PENDING';
  pendingCount = 0;
  activeTab: 'quotes' | 'contacts' = 'quotes';
  
  private quotesSubscription?: Subscription;
  private contactsSubscription?: Subscription;

  constructor(
    private dataService: DataService,
    private router: Router,
    private syncService: FirebaseSyncService,
    private firebaseDataService: FirebaseDataService
  ) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    console.log('🔵 AdminQuotesComponent: Initializing...');
    
    // Subscribe to quotes observable FIRST (before sync) to catch initial state
    console.log('🔵 AdminQuotesComponent: Subscribing to quotes observable...');
    this.quotesSubscription = this.dataService.getQuotes$().subscribe(quotes => {
      console.log(`🟢 AdminQuotesComponent: Quotes observable updated - ${quotes.length} quotes`);
      if (quotes.length > 0) {
        console.log('📋 Sample quotes:', quotes.slice(0, 3).map(q => ({
          id: q.id,
          name: q.name,
          email: q.email,
          status: q.status
        })));
      }
      this.allQuotes = quotes;
      this.applyFilter();
      this.loadPendingCount();
      this.loading = false;
      console.log(`🟢 AdminQuotesComponent: Filtered quotes (${this.filterStatus}): ${this.quotes.length}`);
    });
    
    // Subscribe to contacts observable for reactive updates
    console.log('🔵 AdminQuotesComponent: Subscribing to contacts observable...');
    this.contactsSubscription = this.dataService.getContacts$().subscribe(contacts => {
      console.log(`🟢 AdminQuotesComponent: Contacts observable updated - ${contacts.length} contacts`);
      this.allContacts = contacts;
      // Sort contacts by date (newest first)
      this.contacts = [...contacts].sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 
                     (a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0);
        const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 
                     (b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0);
        return dateB - dateA;
      });
    });
    
    // Load data from Firebase (this will trigger the observable to update)
    try {
      console.log('🔄 AdminQuotesComponent: Starting Firebase sync...');
      await this.syncService.manualSync();
      console.log('✅ AdminQuotesComponent: Firebase sync completed');
      
      // Give it a moment for the observable to update
      setTimeout(() => {
        const currentQuotes = this.dataService.getQuotes().subscribe(quotes => {
          console.log(`📊 AdminQuotesComponent: Final check - ${quotes.length} quotes in store`);
          if (quotes.length === 0 && this.allQuotes.length === 0) {
            console.warn('⚠️ WARNING: No quotes found after sync. Checking Firebase directly...');
            this.checkFirebaseDirectly();
          }
          currentQuotes.unsubscribe();
        });
      }, 500);
    } catch (error: any) {
      console.error('❌ AdminQuotesComponent: Error syncing from Firebase:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message
      });
      // Continue even if sync fails - will use in-memory data
      this.loading = false;
    }
  }

  private async checkFirebaseDirectly(): Promise<void> {
    try {
      const firebaseQuotes = await this.firebaseDataService.getQuotes();
      console.log(`🔍 Direct Firebase check: Found ${firebaseQuotes.length} quotes`);
      if (firebaseQuotes.length > 0) {
        console.warn('⚠️ Firebase has quotes but store is empty. Forcing re-sync...');
        await this.syncService.manualSync();
      }
    } catch (error) {
      console.error('Error checking Firebase directly:', error);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.quotesSubscription) {
      this.quotesSubscription.unsubscribe();
    }
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }

  setFilter(status: string): void {
    this.filterStatus = status;
    this.applyFilter();
  }

  applyFilter(): void {
    if (this.filterStatus === 'ALL') {
      this.quotes = [...this.allQuotes];
    } else {
      this.quotes = this.allQuotes.filter(q => q.status === this.filterStatus);
    }
    // Sort by date (newest first)
    this.quotes.sort((a, b) => {
      const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : 
                   (a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0);
      const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : 
                   (b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0);
      return dateB - dateA;
    });
  }

  loadPendingCount(): void {
    this.pendingCount = this.dataService.getPendingQuotesCount();
  }

  async updateStatus(id: string, status: string): Promise<void> {
    try {
      await this.dataService.updateQuoteStatus(id, status);
      // The observable will automatically update the UI
      console.log('Quote status updated');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status');
    }
  }

  async deleteQuote(id: string): Promise<void> {
    if (confirm('Are you sure you want to delete this quote?')) {
      try {
        await this.dataService.deleteQuote(id);
        // The observable will automatically update the UI
        console.log('Quote deleted');
      } catch (err) {
        console.error('Error deleting quote:', err);
        alert('Failed to delete quote');
      }
    }
  }

  async refreshQuotes(): Promise<void> {
    this.loading = true;
    try {
      // Manually sync from Firebase to ensure we have the latest data
      await this.syncService.manualSync();
      console.log('Refresh completed');
    } catch (error) {
      console.error('Error refreshing quotes:', error);
      // Still show data from in-memory store
    } finally {
      this.loading = false;
    }
  }

  async markContactRead(contactId: string): Promise<void> {
    try {
      await this.dataService.markContactRead(contactId);
      // The observable will automatically update the UI
      console.log('Contact marked as read');
    } catch (err) {
      console.error('Error marking contact as read:', err);
      alert('Failed to mark contact as read');
    }
  }

  async debugInfo(): Promise<void> {
    const info = {
      allQuotes: this.allQuotes.length,
      filteredQuotes: this.quotes.length,
      filterStatus: this.filterStatus,
      pendingCount: this.pendingCount,
      allContacts: this.allContacts.length,
      contacts: this.contacts.length,
      loading: this.loading,
      activeTab: this.activeTab,
      quotesDetails: this.allQuotes.map(q => ({
        id: q.id,
        name: q.name,
        email: q.email,
        status: q.status,
        createdAt: q.createdAt
      }))
    };
    
    console.log('=== ADMIN QUOTES DEBUG INFO ===');
    console.log(JSON.stringify(info, null, 2));
    console.log('All Quotes:', this.allQuotes);
    console.log('Filtered Quotes:', this.quotes);
    console.log('All Contacts:', this.allContacts);
    console.log('Contacts:', this.contacts);
    
    // Also check directly from store
    const directQuotes = this.dataService.getQuotes().subscribe(quotes => {
      console.log('Direct quotes from DataService:', quotes);
      directQuotes.unsubscribe();
    });
    
    // Check directly from Firebase
    try {
      console.log('Checking Firebase directly...');
      const firebaseQuotes = await this.firebaseDataService.getQuotes();
      console.log('Quotes from Firebase (direct):', firebaseQuotes);
      console.log(`Found ${firebaseQuotes.length} quotes in Firebase`);
      
      if (firebaseQuotes.length > 0 && this.allQuotes.length === 0) {
        console.warn('⚠️ WARNING: Firebase has quotes but store is empty! Syncing now...');
        await this.syncService.manualSync();
      }
    } catch (error) {
      console.error('Error checking Firebase directly:', error);
    }
    
    alert(`Debug info logged to console.\n\nQuotes: ${this.allQuotes.length} total, ${this.quotes.length} filtered\nContacts: ${this.allContacts.length} total\nCheck browser console for details.`);
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

  getQuoteId(quote: any): string {
    // Handle both string IDs and numeric IDs
    if (quote.id) {
      return String(quote.id);
    }
    // Fallback: generate a temporary ID based on email and timestamp
    return quote.email + '_' + (quote.createdAt?.getTime() || Date.now());
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    if (date instanceof Date) {
      return date.toLocaleString();
    }
    if (date.toDate && typeof date.toDate === 'function') {
      // Firestore Timestamp
      return date.toDate().toLocaleString();
    }
    if (typeof date === 'string') {
      return new Date(date).toLocaleString();
    }
    if (date.seconds) {
      // Firestore Timestamp object
      return new Date(date.seconds * 1000).toLocaleString();
    }
    return 'N/A';
  }
}
