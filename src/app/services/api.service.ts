import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Contact, ContactResponse } from '../models/contact.model';
import { QuoteRequest, QuoteResponse } from '../models/quote.model';
import { PackageResponse } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Contact API
  submitContact(contact: Contact): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(
      `${this.apiUrl}/contacts`,
      contact,
      { headers: this.getHeaders() }
    );
  }

  // Quote API
  submitQuoteRequest(quote: QuoteRequest): Observable<QuoteResponse> {
    return this.http.post<QuoteResponse>(
      `${this.apiUrl}/quotes`,
      quote,
      { headers: this.getHeaders() }
    );
  }

  // Package Tracking API
  trackPackage(trackingId: string): Observable<PackageResponse> {
    return this.http.get<PackageResponse>(
      `${this.apiUrl}/track/${trackingId}`,
      { headers: this.getHeaders() }
    );
  }
}


