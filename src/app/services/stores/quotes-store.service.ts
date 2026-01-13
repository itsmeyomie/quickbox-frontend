import { Injectable } from '@angular/core';
import { InMemoryStoreService } from '../in-memory-store.service';

export interface Quote {
  id?: string;
  name: string;
  email: string;
  contactNumber: string;
  serviceType?: string;
  pickupLocation?: string;
  deliveryDestination?: string;
  packageWeight?: string;
  additionalServices?: string;
  status: 'PENDING' | 'PROCESSING' | 'QUOTED' | 'ACCEPTED' | 'REJECTED';
  createdAt?: Date | any;
  updatedAt?: Date | any;
}

@Injectable({
  providedIn: 'root'
})
export class QuotesStoreService extends InMemoryStoreService<Quote> {
  protected override getStoreName(): string {
    return 'quotes';
  }

  /**
   * Get quotes by status
   * @param status Quote status
   * @returns Array of quotes with matching status
   */
  getByStatus(status: Quote['status']): Quote[] {
    return this.find(q => q.status === status);
  }

  /**
   * Get pending quotes count
   * @returns Number of pending quotes
   */
  getPendingCount(): number {
    return this.getByStatus('PENDING').length;
  }

  /**
   * Update quote status
   * @param id Quote id
   * @param status New status
   * @returns Updated quote or undefined
   */
  updateStatus(id: string, status: Quote['status']): Quote | undefined {
    return this.update(id, { 
      status, 
      updatedAt: new Date() 
    });
  }

  /**
   * Convert quote to order
   * @param quoteId Quote id
   * @returns Quote data ready for order creation
   */
  convertToOrder(quoteId: string): Quote | undefined {
    const quote = this.getById(quoteId);
    if (quote) {
      this.updateStatus(quoteId, 'ACCEPTED');
    }
    return quote;
  }
}
