import { Injectable } from '@angular/core';
import { QuotesStoreService } from './stores/quotes-store.service';
import { DataService } from './data.service';
import { FirebaseSyncService } from './firebase-sync.service';

/**
 * Test Service for End-to-End Quote Flow Testing
 * Use this in browser console to test the quote system
 */
@Injectable({
  providedIn: 'root'
})
export class TestQuoteFlowService {
  constructor(
    private quotesStore: QuotesStoreService,
    private dataService: DataService,
    private syncService: FirebaseSyncService
  ) {}

  /**
   * Test quote submission flow
   */
  async testQuoteSubmission(): Promise<void> {
    console.log('=== Testing Quote Submission ===');
    
    const testQuote = {
      name: 'Test User',
      email: 'test@example.com',
      contactNumber: '+254712345678',
      serviceType: 'Same-Day Delivery',
      pickupLocation: 'Nairobi CBD',
      deliveryDestination: 'Westlands',
      packageWeight: '5kg',
      additionalServices: 'Express Delivery'
    };

    try {
      // Submit quote
      const response = await this.dataService.submitQuoteRequest(testQuote).toPromise();
      console.log('✅ Quote submitted:', response);
      
      // Check in-memory store
      const quotes = this.quotesStore.getAll();
      console.log('✅ Quotes in memory:', quotes.length);
      console.log('✅ Latest quote:', quotes[quotes.length - 1]);
      
      // Check sync status
      const syncStatus = this.syncService.getSyncStatus();
      console.log('✅ Sync status:', syncStatus);
      
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Test failed:', error);
      throw error;
    }
  }

  /**
   * Test quote loading
   */
  testQuoteLoading(): void {
    console.log('=== Testing Quote Loading ===');
    
    const quotes = this.quotesStore.getAll();
    console.log('✅ Total quotes in memory:', quotes.length);
    
    const pending = this.quotesStore.getByStatus('PENDING');
    console.log('✅ Pending quotes:', pending.length);
    
    const processing = this.quotesStore.getByStatus('PROCESSING');
    console.log('✅ Processing quotes:', processing.length);
    
    if (quotes.length > 0) {
      console.log('✅ Sample quote:', quotes[0]);
    } else {
      console.warn('⚠️ No quotes found in memory');
    }
  }

  /**
   * Test Firebase sync
   */
  async testFirebaseSync(): Promise<void> {
    console.log('=== Testing Firebase Sync ===');
    
    try {
      await this.syncService.manualSync();
      console.log('✅ Firebase sync completed');
      
      const quotes = this.quotesStore.getAll();
      console.log('✅ Quotes after sync:', quotes.length);
    } catch (error) {
      console.error('❌ Sync failed:', error);
      throw error;
    }
  }

  /**
   * Run all tests
   */
  async runAllTests(): Promise<void> {
    console.log('🧪 Running End-to-End Tests...\n');
    
    try {
      // Test 1: Check current state
      console.log('Test 1: Current State');
      this.testQuoteLoading();
      console.log('');
      
      // Test 2: Submit new quote
      console.log('Test 2: Submit Quote');
      await this.testQuoteSubmission();
      console.log('');
      
      // Test 3: Verify quote in memory
      console.log('Test 3: Verify Quote in Memory');
      this.testQuoteLoading();
      console.log('');
      
      // Test 4: Sync to Firebase
      console.log('Test 4: Sync to Firebase');
      await this.testFirebaseSync();
      console.log('');
      
      console.log('✅ All tests completed successfully!');
    } catch (error) {
      console.error('❌ Tests failed:', error);
      throw error;
    }
  }

  /**
   * Get test summary
   */
  getTestSummary(): any {
    const quotes = this.quotesStore.getAll();
    const syncStatus = this.syncService.getSyncStatus();
    
    return {
      quotesInMemory: quotes.length,
      pendingQuotes: this.quotesStore.getByStatus('PENDING').length,
      processingQuotes: this.quotesStore.getByStatus('PROCESSING').length,
      quotedQuotes: this.quotesStore.getByStatus('QUOTED').length,
      syncStatus: syncStatus,
      latestQuote: quotes.length > 0 ? quotes[quotes.length - 1] : null
    };
  }
}
