import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { FirebaseDataService } from './firebase-data.service';
import { Contact, ContactResponse } from '../models/contact.model';
import { QuoteRequest, QuoteResponse } from '../models/quote.model';
import { PackageResponse } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private firebaseData: FirebaseDataService) { }

  // Contact API
  submitContact(contact: Contact): Observable<ContactResponse> {
    return from(this.firebaseData.submitContact(contact));
  }

  // Quote API
  submitQuoteRequest(quote: QuoteRequest): Observable<QuoteResponse> {
    return from(this.firebaseData.submitQuote(quote));
  }

  // Package Tracking API
  trackPackage(trackingId: string): Observable<PackageResponse> {
    return from(this.firebaseData.trackPackage(trackingId));
  }
}


