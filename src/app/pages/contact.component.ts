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
                                        <textarea class="form-control w-100" name="message" id="message" 
                                                  cols="30" rows="9" placeholder="Enter Message" 
                                                  [(ngModel)]="contact.message" required></textarea>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input class="form-control valid" name="name" id="name" type="text" 
                                               placeholder="Enter your name" [(ngModel)]="contact.name" required>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input class="form-control valid" name="email" id="email" type="email" 
                                               placeholder="Email" [(ngModel)]="contact.email" required>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <input class="form-control" name="subject" id="subject" type="text" 
                                               placeholder="Enter Subject" [(ngModel)]="contact.subject" required>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <input class="form-control" name="phone" id="phone" type="text" 
                                               placeholder="Phone (Optional)" [(ngModel)]="contact.phone">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <button type="submit" class="button button-contactForm boxed-btn" 
                                        [disabled]="isSubmitting || !contactForm.valid">
                                    <span *ngIf="!isSubmitting">Send</span>
                                    <span *ngIf="isSubmitting">Sending...</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-3 offset-lg-1">
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-home"></i></span>
                            <div class="media-body">
                                <h3>QuickBox Headquarters</h3>
                                <p>123 Delivery Street, Suite 100<br>New York, NY 10001</p>
                            </div>
                        </div>
                        <div class="media contact-info">
                            <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                            <div class="media-body">
                                <h3>0722 883443</h3>
                                <p style="margin-top: 5px;">0118047315</p>
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
      `
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

