import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Contact } from '../models/contact.model';

@Component({
  standalone: true,
  selector: 'app-contact',
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <main>
        <!--? slider Area Start-->
        <div class="slider-area ">
            <div class="single-slider hero-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap">
                                <h2>Contact QuickBox</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">Contact</a></li> 
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- slider Area End-->
        <!-- ================ contact section start ================= -->
        <section class="contact-section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h2 class="contact-title">Get in Touch</h2>
                    </div>
                    <div class="col-lg-8">
                        <div *ngIf="successMessage" class="alert alert-success" role="alert">
                            {{ successMessage }}
                        </div>
                        <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
                            {{ errorMessage }}
                        </div>
                        <form class="form-contact contact_form" (ngSubmit)="onSubmit()" #contactForm="ngForm">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="message" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Message <span style="color: red;">*</span></label>
                                        <textarea class="form-control w-100" name="message" id="message" 
                                                  cols="30" rows="9" placeholder="Enter Message *" 
                                                  [(ngModel)]="contact.message" 
                                                  required
                                                  minlength="10"
                                                  #messageField="ngModel"
                                                  [class.is-invalid]="messageField.invalid && messageField.touched"></textarea>
                                        <div *ngIf="messageField.invalid && messageField.touched" class="invalid-feedback" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="messageField.errors?.['required']">Message is required</div>
                                            <div *ngIf="messageField.errors?.['minlength']">Message must be at least 10 characters</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="name" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Name <span style="color: red;">*</span></label>
                                        <input class="form-control valid" name="name" id="name" type="text" 
                                               placeholder="Enter your name *" 
                                               [(ngModel)]="contact.name" 
                                               required
                                               minlength="2"
                                               #nameField="ngModel"
                                               [class.is-invalid]="nameField.invalid && nameField.touched">
                                        <div *ngIf="nameField.invalid && nameField.touched" class="invalid-feedback" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="nameField.errors?.['required']">Name is required</div>
                                            <div *ngIf="nameField.errors?.['minlength']">Name must be at least 2 characters</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="email" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Email <span style="color: red;">*</span></label>
                                        <input class="form-control valid" name="email" id="email" type="email" 
                                               placeholder="Email *" 
                                               [(ngModel)]="contact.email" 
                                               required
                                               email
                                               #emailField="ngModel"
                                               [class.is-invalid]="emailField.invalid && emailField.touched">
                                        <div *ngIf="emailField.invalid && emailField.touched" class="invalid-feedback" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="emailField.errors?.['required']">Email is required</div>
                                            <div *ngIf="emailField.errors?.['email']">Please enter a valid email address</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="subject" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Subject <span style="color: red;">*</span></label>
                                        <input class="form-control" name="subject" id="subject" type="text" 
                                               placeholder="Enter Subject *" 
                                               [(ngModel)]="contact.subject" 
                                               required
                                               minlength="3"
                                               #subjectField="ngModel"
                                               [class.is-invalid]="subjectField.invalid && subjectField.touched">
                                        <div *ngIf="subjectField.invalid && subjectField.touched" class="invalid-feedback" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="subjectField.errors?.['required']">Subject is required</div>
                                            <div *ngIf="subjectField.errors?.['minlength']">Subject must be at least 3 characters</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label for="phone" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Phone Number <span style="color: red;">*</span></label>
                                        <input class="form-control" name="phone" id="phone" type="tel" 
                                               placeholder="Phone Number *" 
                                               [(ngModel)]="contact.phone" 
                                               required
                                               pattern="[0-9+\s\-()]+"
                                               minlength="10"
                                               #phoneField="ngModel"
                                               [class.is-invalid]="phoneField.invalid && phoneField.touched">
                                        <div *ngIf="phoneField.invalid && phoneField.touched" class="invalid-feedback" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="phoneField.errors?.['required']">Phone number is required</div>
                                            <div *ngIf="phoneField.errors?.['minlength']">Phone number must be at least 10 digits</div>
                                            <div *ngIf="phoneField.errors?.['pattern']">Please enter a valid phone number</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <button type="submit" class="button button-contactForm boxed-btn" 
                                        [disabled]="isSubmitting || !contactForm.valid">
                                    <span *ngIf="!isSubmitting">Send</span>
                                    <span *ngIf="isSubmitting">Sending...</span>
                                </button>
                                <div *ngIf="!contactForm.valid && contactForm.touched" style="color: red; font-size: 12px; margin-top: 10px;">
                                    Please fill in all required fields correctly
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-3 offset-lg-1">
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-home"></i></span>
                            <div class="media-body">
                                <h3>QuickBox Headquarters</h3>
                                <p>Embakasi, Nairobi<br>Kenya</p>
                            </div>
                        </div>
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                            <div class="media-body">
                                <h3>+254118047315</h3>
                                <p style="font-weight: 600; color: #f15f22; margin-bottom: 5px;">Dedicated Call Center</p>
                                <p>Mon to Fri 8am to 8pm</p>
                            </div>
                        </div>
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-email"></i></span>
                            <div class="media-body">
                                <h3>info&#64;quickboxcourier.co.ke</h3>
                                <p>Send us your query anytime!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- ================ contact section end ================= -->
    </main>

    <!-- Scroll Up -->
    <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `,
  styles: [`
    .is-invalid {
      border-color: #dc3545 !important;
      border-width: 2px !important;
    }
    .invalid-feedback {
      display: block;
    }
  `]
})
export class ContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  onSubmit() {
    if (this.isSubmitting) return;
    
    // Validate all fields are filled
    if (!this.contact.name || !this.contact.email || !this.contact.phone || !this.contact.subject || !this.contact.message) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    // Validate name (trim and check length)
    const trimmedName = this.contact.name.trim();
    if (trimmedName.length < 2) {
      this.errorMessage = 'Name must be at least 2 characters long';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contact.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Validate phone format (at least 10 digits)
    const phoneRegex = /^[0-9+\s\-()]{10,}$/;
    if (!phoneRegex.test(this.contact.phone.replace(/\s/g, ''))) {
      this.errorMessage = 'Please enter a valid phone number (at least 10 digits)';
      return;
    }

    // Validate message length
    if (this.contact.message.trim().length < 10) {
      this.errorMessage = 'Message must be at least 10 characters long';
      return;
    }
    
    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.apiService.submitContact(this.contact).subscribe({
      next: (response) => {
        this.successMessage = response.message || 'Your message has been sent successfully!';
        this.contact = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        };
        this.isSubmitting = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to send message. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}

