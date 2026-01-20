import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { EmailService } from '../services/email.service';
import { QuoteRequest } from '../models/quote.model';

@Component({
  standalone: true,
  selector: 'app-landing-page',
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
<main style="background-color: #FFF6E8; min-height: calc(100vh - 200px);">
    <!-- Hero Section -->
    <div class="container" style="max-width: 1100px; margin: auto; padding: 60px 20px;">
        <div class="hero" style="display: flex; flex-wrap: wrap; align-items: center; gap: 40px;">
            <div class="hero-text" style="flex: 1; min-width: 300px;">
                <h1 style="font-size: 42px; color: #1F3A5F; margin-bottom: 25px; font-weight: 700; line-height: 1.2;">
                    Reliable Fulfillment & Courier Partner in Kenya
                </h1>
                <p style="font-size: 18px; color: #666; margin: 20px 0 30px; line-height: 1.8;">
                    We help international e-commerce sellers ship, store, fulfill orders,
                    deliver last-mile, and manage Cash on Delivery across Kenya.
                </p>
                <a routerLink="/contact" class="cta-btn" style="background-color: #F15A24; color: white; padding: 15px 35px; border: none; font-size: 18px; cursor: pointer; border-radius: 5px; text-decoration: none; display: inline-block; font-weight: 600; transition: all 0.3s ease;">
                    Get a Shipping Partner
                </a>
            </div>
            <div class="hero-image" style="flex: 1; min-width: 300px; text-align: center;">
                <img src="assets/img/logo/logo.png" alt="QuickBox Courier Delivery" 
                     style="width: 100%; max-width: 450px; height: auto; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);"
                     onerror="this.src='assets/img/gallery/about1.jpg';">
            </div>
        </div>
    </div>

    <!-- Services Section -->
    <div class="services" style="background-color: white; padding: 70px 20px; margin-top: 40px;">
        <div class="container" style="max-width: 1100px; margin: auto;">
            <h2 style="text-align: center; color: #1F3A5F; font-size: 36px; font-weight: 700; margin-bottom: 50px;">
                Our Services
            </h2>
            <div class="service-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 30px;">
                <div class="service-box" style="border: 1px solid #e0e0e0; padding: 35px 25px; border-radius: 10px; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #F15A24 0%, #ff8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <span class="flaticon-shipped" style="font-size: 35px; color: white;"></span>
                    </div>
                    <h3 style="color: #1F3A5F; font-size: 22px; font-weight: 600; margin-bottom: 15px; text-align: center;">Order Fulfillment</h3>
                    <p style="color: #666; line-height: 1.8; margin: 0; text-align: center; flex: 1;">Receive, store, pick, pack, and ship orders across Kenya.</p>
                </div>
                <div class="service-box" style="border: 1px solid #e0e0e0; padding: 35px 25px; border-radius: 10px; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <span class="flaticon-clock" style="font-size: 35px; color: white;"></span>
                    </div>
                    <h3 style="color: #1F3A5F; font-size: 22px; font-weight: 600; margin-bottom: 15px; text-align: center;">Last-Mile Delivery</h3>
                    <p style="color: #666; line-height: 1.8; margin: 0; text-align: center; flex: 1;">Fast nationwide delivery to customers.</p>
                </div>
                <div class="service-box" style="border: 1px solid #e0e0e0; padding: 35px 25px; border-radius: 10px; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <span class="flaticon-support" style="font-size: 35px; color: white;"></span>
                    </div>
                    <h3 style="color: #1F3A5F; font-size: 22px; font-weight: 600; margin-bottom: 15px; text-align: center;">Cash on Delivery (COD)</h3>
                    <p style="color: #666; line-height: 1.8; margin: 0; text-align: center; flex: 1;">We collect payments and remit securely.</p>
                </div>
                <div class="service-box" style="border: 1px solid #e0e0e0; padding: 35px 25px; border-radius: 10px; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                    <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                        <span class="flaticon-place" style="font-size: 35px; color: white;"></span>
                    </div>
                    <h3 style="color: #1F3A5F; font-size: 22px; font-weight: 600; margin-bottom: 15px; text-align: center;">International Seller Support</h3>
                    <p style="color: #666; line-height: 1.8; margin: 0; text-align: center; flex: 1;">Trusted partner for China, Nigeria & Morocco sellers.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Partnership Request Form Section -->
    <div class="form-section" style="background-color: #1F3A5F; color: white; padding: 70px 20px; margin-top: 40px;">
        <div class="container" style="max-width: 1100px; margin: auto;">
            <h2 style="text-align: center; font-size: 36px; font-weight: 700; margin-bottom: 50px;">
                Request a Partnership
            </h2>
            <div *ngIf="quoteSuccessMessage" class="alert alert-success" style="background: #4caf50; color: white; padding: 15px 20px; border-radius: 5px; margin-bottom: 20px; max-width: 500px; margin-left: auto; margin-right: auto;">
                {{ quoteSuccessMessage }}
            </div>
            <div *ngIf="quoteErrorMessage" class="alert alert-danger" style="background: #f44336; color: white; padding: 15px 20px; border-radius: 5px; margin-bottom: 20px; max-width: 500px; margin-left: auto; margin-right: auto;">
                {{ quoteErrorMessage }}
            </div>
            <form (ngSubmit)="submitPartnershipRequest()" style="max-width: 500px; margin: auto;">
                <input type="text" placeholder="Company Name" 
                       [(ngModel)]="partnershipForm.companyName" 
                       name="companyName" 
                       required
                       style="width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 5px; border: none; font-size: 16px; box-sizing: border-box;">
                <input type="text" placeholder="Contact Person" 
                       [(ngModel)]="partnershipForm.contactPerson" 
                       name="contactPerson" 
                       required
                       style="width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 5px; border: none; font-size: 16px; box-sizing: border-box;">
                <input type="email" placeholder="Email Address" 
                       [(ngModel)]="partnershipForm.email" 
                       name="email" 
                       required
                       style="width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 5px; border: none; font-size: 16px; box-sizing: border-box;">
                <input type="text" placeholder="Country" 
                       [(ngModel)]="partnershipForm.country" 
                       name="country" 
                       required
                       style="width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 5px; border: none; font-size: 16px; box-sizing: border-box;">
                <textarea placeholder="Tell us about your shipping needs" 
                          [(ngModel)]="partnershipForm.shippingNeeds" 
                          name="shippingNeeds"
                          rows="4"
                          style="width: 100%; padding: 14px; margin-bottom: 15px; border-radius: 5px; border: none; font-size: 16px; box-sizing: border-box; resize: vertical; font-family: inherit;"></textarea>
                <button type="submit" 
                        [disabled]="isSubmittingQuote"
                        style="width: 100%; background-color: #F15A24; color: white; padding: 15px; border: none; font-size: 18px; cursor: pointer; border-radius: 5px; font-weight: 600; transition: all 0.3s ease;">
                    <span *ngIf="!isSubmittingQuote">Submit Request</span>
                    <span *ngIf="isSubmittingQuote">Submitting...</span>
                </button>
            </form>
        </div>
    </div>
</main>
      `
})
export class LandingPageComponent {
  isSubmittingQuote = false;
  quoteSuccessMessage = '';
  quoteErrorMessage = '';

  partnershipForm = {
    companyName: '',
    contactPerson: '',
    email: '',
    country: '',
    shippingNeeds: ''
  };

  constructor(
    private apiService: ApiService,
    private emailService: EmailService
  ) {}

  submitPartnershipRequest() {
    if (this.isSubmittingQuote) return;
    
    this.isSubmittingQuote = true;
    this.quoteSuccessMessage = '';
    this.quoteErrorMessage = '';

    // Convert partnership form to quote request format
    const quoteRequest: QuoteRequest = {
      name: this.partnershipForm.contactPerson,
      email: this.partnershipForm.email,
      contactNumber: '', // Not in partnership form
      serviceType: 'Partnership Request',
      pickupLocation: this.partnershipForm.country,
      deliveryDestination: '',
      packageWeight: '',
      additionalServices: this.partnershipForm.shippingNeeds
    };

    this.apiService.submitQuoteRequest(quoteRequest).subscribe({
      next: (response) => {
        // Send partnership email separately
        this.emailService.sendPartnershipEmail({
          companyName: this.partnershipForm.companyName,
          contactPerson: this.partnershipForm.contactPerson,
          email: this.partnershipForm.email,
          country: this.partnershipForm.country,
          shippingNeeds: this.partnershipForm.shippingNeeds
        }).catch(err => {
          console.error('Failed to send partnership email:', err);
        });

        this.quoteSuccessMessage = 'Partnership request submitted successfully! We will contact you soon.';
        // Reset form
        this.partnershipForm = {
          companyName: '',
          contactPerson: '',
          email: '',
          country: '',
          shippingNeeds: ''
        };
        this.isSubmittingQuote = false;
      },
      error: (error) => {
        this.quoteErrorMessage = error.error?.message || 'Failed to submit partnership request. Please try again.';
        this.isSubmittingQuote = false;
      }
    });
  }
}
