import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Contact, ContactResponse } from '../models/contact.model';
import { QuoteRequest, QuoteResponse } from '../models/quote.model';
import { PackageResponse } from '../models/package.model';

/**
 * API Service - Wrapper for backward compatibility
 * Now uses DataService which works with in-memory stores
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private dataService: DataService) { }

  // Contact API
  submitContact(contact: Contact): Observable<ContactResponse> {
    return this.dataService.submitContact(contact);
  }

  // Quote API
  submitQuoteRequest(quote: QuoteRequest): Observable<QuoteResponse> {
    return this.dataService.submitQuoteRequest(quote);
  }

  // Package Tracking API
  trackPackage(trackingId: string): Observable<PackageResponse> {
    return this.dataService.trackPackage(trackingId);
  }
}


