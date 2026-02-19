import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { FirebaseDataService } from '../services/firebase-data.service';
import { QuoteRequest } from '../models/quote.model';
import { PackageResponse } from '../models/package.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
<main class="home-main">
    <!--? Full-Width Hero Slider Start (CitySprint-style) -->
    <div class="hero-slider-wrapper">
        <div class="hero-slider-track" [style.transform]="'translateX(-' + (currentSlide * 100) + 'vw)'">
            <div *ngFor="let slide of heroSlides; let i = index" class="hero-slide" 
                 [style.background]="'url(' + slide.image + ') center center / cover no-repeat'">
            </div>
        </div>
        <!-- Dark overlay for text readability -->
        <div class="hero-slider-overlay" style="position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,31,63,0.75) 0%, rgba(0,61,122,0.65) 50%, rgba(0,0,0,0.4) 100%); pointer-events: none;"></div>
        <!-- Content overlay -->
        <div class="hero-slider-content" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 2;">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="hero__caption text-center" style="padding: 40px 0;">
                            <h1 style="color: white; margin-bottom: 20px; font-size: clamp(24px, 4.5vw, 42px); font-weight: 700; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); line-height: 1.2;">Reliable Fulfillment & Last-Mile Delivery for Growing E-Commerce Businesses in Kenya</h1>
                            <p style="color: rgba(255,255,255,0.95); font-size: clamp(15px, 2.2vw, 18px); margin-bottom: 20px; max-width: 850px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                                Quick Box is a fulfillment and logistics partner built for online sellers who need dependable storage, accurate order fulfillment, nationwide delivery, secure Cash on Delivery (COD) handling, and transparent returns management—without the stress of managing logistics internally.
                            </p>
                            <p style="color: rgba(255,255,255,0.9); font-size: clamp(13px, 1.8vw, 15px); margin-bottom: 25px; max-width: 750px; margin-left: auto; margin-right: auto; line-height: 1.6;">
                                Transparent operations • Secure COD handling • Clear payout schedules • Full delivery documentation • Operational visibility at every stage
                            </p>
                            <a routerLink="/contact" class="btn" style="background: #f15f22; color: white; padding: 15px 35px; font-size: 16px; font-weight: 600; border-radius: 8px; text-decoration: none; display: inline-block; border: none;">Talk to Operations</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Slider dots -->
        <div class="hero-slider-dots" style="position: absolute; bottom: 25px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; gap: 15px; pointer-events: auto;">
            <button *ngFor="let slide of heroSlides; let i = index" 
                    (click)="goToSlide(i); pauseSlider();"
                    [class.active]="currentSlide === i"
                    class="hero-dot"
                    type="button"
                    [attr.aria-label]="'Slide ' + (i+1)">
            </button>
        </div>
    </div>
    <!-- slider Area End-->
    
    <!-- Tracking Section Start -->
    <div class="tracking-section" style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 80px 20px;">
        <div class="container">
            <div class="row">
                <div class="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                    <div class="text-center" style="margin-bottom: 40px;">
                        <h2 style="color: white; font-size: 36px; font-weight: 700; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">Track Your Package</h2>
                        <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin-bottom: 0;">Track your package in real-time</p>
                    </div>
                    <!--Hero form -->
                    <form (ngSubmit)="trackPackage()" class="search-box" #trackForm1="ngForm" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; max-width: 700px; margin: 0 auto;">
                        <div class="input-form" style="flex: 1; min-width: 250px;">
                            <input type="text" placeholder="Your Tracking ID" 
                                   [(ngModel)]="trackingId" name="trackingId" required #trackingIdField1="ngModel"
                                   style="width: 100%; padding: 15px 20px; border: none; border-radius: 5px; font-size: 16px;">
                        </div>
                        <div class="search-form">
                            <button type="submit" [disabled]="isTracking || !trackForm1.valid" 
                                    style="background: #f15f22; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; white-space: nowrap; font-size: 16px;">
                                Track Package
                            </button>
                        </div>	
                    </form>	
                    <div *ngIf="!trackForm1.valid && trackForm1.touched" style="color: #ffdede; margin-top: 10px; font-size: 13px; text-align: center;">
                        Please enter your tracking ID
                    </div>
                    <!-- Tracking Results -->
                    <div *ngIf="trackingResult" class="mt-3" style="color: white; text-align: center; margin-top: 30px;">
                        <div *ngIf="trackingResult.success && trackingResult.data" class="alert alert-success" style="background: rgba(76, 175, 80, 0.9); padding: 15px; border-radius: 5px; display: inline-block;">
                            <strong>Package Found!</strong><br>
                            Status: {{ trackingResult.data.status }}<br>
                            <span *ngIf="trackingResult.data.estimatedDelivery">
                                Estimated Delivery: {{ trackingResult.data.estimatedDelivery | date }}
                            </span>
                        </div>
                        <div *ngIf="!trackingResult.success" class="alert alert-danger" style="background: rgba(244, 67, 54, 0.9); padding: 15px; border-radius: 5px; display: inline-block;">
                            {{ trackingResult.message || 'Package not found' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Tracking Section End -->
    
    <!--? our info Start -->
    <div class="our-info-area pt-70 pb-40">
        <div class="container">
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px;">
                    <div class="single-info mb-30" style="text-align: center; padding: 20px;">
                        <div class="info-icon" style="margin-bottom: 15px;">
                            <span class="flaticon-support"></span>
                        </div>
                        <div class="info-caption">
                            <p style="margin-bottom: 8px; font-weight: 600;">Dedicated Call Center</p>
                            <span style="display: block; font-weight: 600; color: #f15f22; margin-bottom: 5px;">+254118047315</span>
                            <span style="display: block; font-size: 14px; color: #666;">Call us anytime</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px;">
                    <div class="single-info mb-30" style="text-align: center; padding: 20px;">
                        <div class="info-icon" style="margin-bottom: 15px;">
                            <span class="flaticon-clock"></span>
                        </div>
                        <div class="info-caption">
                            <p style="margin-bottom: 8px; font-weight: 600;">24/7 Support</p>
                            <span style="display: block;">Mon - Sun 24 Hours</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px;">
                    <div class="single-info mb-30" style="text-align: center; padding: 20px;">
                        <div class="info-icon" style="margin-bottom: 15px;">
                            <span class="flaticon-place"></span>
                        </div>
                        <div class="info-caption">
                            <p style="margin-bottom: 8px; font-weight: 600;">Nationwide Coverage</p>
                            <span style="display: block;">Nairobi Kenya Nationwide Coverage</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- our info End -->
    <!--? Categories Area Start -->
    <div class="categories-area section-padding30">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <!-- Section Tittle -->
                    <div class="section-tittle text-center mb-60">
                        <span>Who This Is For</span>
                        <h2>Built for Sellers Who Can't Afford Unreliable Logistics</h2>
                        <p style="max-width: 700px; margin: 15px auto 0; color: #666; line-height: 1.8;">Quick Box is designed for businesses that have outgrown informal delivery solutions and need a structured, professional logistics partner they can trust with inventory, customer experience, and cash flow.</p>
                    </div>
                </div>
            </div>
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-shipped"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 50px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">E-Commerce Sellers Handling Daily Orders</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Businesses processing consistent order volumes that need reliable fulfillment without hiring internal logistics teams.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-support"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 50px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Instagram & WhatsApp Businesses Scaling Fast</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Social commerce sellers who want to focus on marketing and sales while logistics, deliveries, and COD are handled professionally.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-clock"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 50px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">SMEs Facing Failed Deliveries & COD Delays</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Businesses tired of lost parcels, unreliable riders, and unclear payment remittances.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-ship"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 50px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Brands Seeking Professional Fulfillment</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Companies that want enterprise-level discipline without enterprise-level complexity or long-term contracts.</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Core Services Snapshot -->
            <div class="section-tittle text-center mb-60 mt-80">
                <span>Core Services</span>
                <h2>Everything You Need to Deliver, Collect & Scale With Confidence</h2>
            </div>
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; padding: 30px 20px; background: #f8f9fa; border-radius: 12px;">
                        <h5 style="margin-bottom: 15px; color: #001f3f;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Order Fulfillment</a></h5>
                        <p style="margin: 0; line-height: 1.8; font-size: 15px;">We receive your inventory, accurately pick and pack orders, and dispatch them efficiently. Each order is handled with care to minimize errors, delays, and customer dissatisfaction.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; padding: 30px 20px; background: #f8f9fa; border-radius: 12px;">
                        <h5 style="margin-bottom: 15px; color: #001f3f;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Warehousing</a></h5>
                        <p style="margin: 0; line-height: 1.8; font-size: 15px;">Your stock is stored in a secure, organized facility with documented handling. Inventory is structured for fast retrieval and smooth fulfillment, reducing losses and confusion.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; padding: 30px 20px; background: #f8f9fa; border-radius: 12px;">
                        <h5 style="margin-bottom: 15px; color: #001f3f;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Nationwide Last-Mile Delivery</a></h5>
                        <p style="margin: 0; line-height: 1.8; font-size: 15px;">We deliver across Kenya using trained riders and clear delivery protocols. Each handover is structured to improve delivery success rates and customer trust.</p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; padding: 30px 20px; background: #f8f9fa; border-radius: 12px;">
                        <h5 style="margin-bottom: 15px; color: #001f3f;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Cash on Delivery (COD)</a></h5>
                        <p style="margin: 0; line-height: 1.8; font-size: 15px;">Payments are collected securely from customers at delivery and reconciled transparently. You receive payouts based on clearly communicated and agreed timelines.</p>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; padding: 30px 20px; background: #f8f9fa; border-radius: 12px;">
                        <h5 style="margin-bottom: 15px; color: #001f3f;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Returns Management</a></h5>
                        <p style="margin: 0; line-height: 1.8; font-size: 15px;">Failed deliveries and customer returns are logged, documented, and processed transparently. Returned inventory is accounted for and safely managed.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-40">
                <a routerLink="/how-it-works" class="btn" style="background: #001f3f; color: white; padding: 15px 35px; border: none; border-radius: 8px;">See How It Works</a>
            </div>
        </div>
    </div>
    <!-- Categories Area End -->
    <!--? About Area Start -->
    <div class="about-low-area padding-bottom" style="overflow: hidden;">
        <div class="container">
            <div class="row align-items-center" style="margin: 0 -15px;">
                <div class="col-lg-6 col-md-12 order-2 order-lg-1" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="about-caption mb-50" style="padding-right: 0;">
                        <div class="section-tittle mb-35">
                            <span>A Simple, Transparent Fulfillment Process</span>
                            <h2>How Quick Box Works</h2>
                        </div>
                        <ul style="color: #555; line-height: 2; padding-left: 20px; margin-bottom: 25px;">
                            <li>You send your inventory to Quick Box</li>
                            <li>Orders come in from your website, social channels, or WhatsApp</li>
                            <li>We pick, pack, and dispatch each order</li>
                            <li>Deliveries are completed and COD collected securely</li>
                            <li>Funds are reconciled and paid out on schedule</li>
                        </ul>
                        <a routerLink="/how-it-works" class="btn">View Full Process</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 order-1 order-lg-2" style="padding: 0 15px;">
                    <div style="text-align: center; padding: 20px 0;">
                        <img src="assets/img/pics/delivery.jpeg" alt="QuickBox Delivery"
                             style="max-width: 100%; width: 100%; height: auto; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: block; margin: 0 auto;">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About Area End -->
    <!--? contact-form start -->
    <section class="contact-form-area section-bg pt-115 pb-120 fix" data-background="assets/img/gallery/section_bg02.jpg" style="background-size: cover; background-position: center; position: relative;">
        <div class="container">
            <div class="row justify-content-end">
                <!-- Contact wrapper -->
                <div class="col-xl-8 col-lg-9">
                    <div class="contact-form-wrapper">
                        <!-- From tittle -->
                        <div class="row">
                            <div class="col-lg-12">
                                <!-- Section Tittle -->
                                <div class="section-tittle mb-50">
                                    <span>Get a Quote For Free</span>
                                    <h2>Request a Free Quote</h2>
                                    <p>Fill out the form below and our team will get back to you with a customized quote for your delivery needs.</p>
                                </div>
                            </div>
                        </div>
                        <!-- form -->
                        <div *ngIf="quoteSuccessMessage" class="alert alert-success mb-3">
                            {{ quoteSuccessMessage }}
                        </div>
                        <div *ngIf="quoteErrorMessage" class="alert alert-danger mb-3">
                            {{ quoteErrorMessage }}
                        </div>
                        <form (ngSubmit)="submitQuote()" class="contact-form" #quoteForm="ngForm">
                            <div class="row ">
                                <div class="col-lg-6 col-md-6">
                                    <div class="input-form">
                                        <label for="quoteName" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Your Name <span style="color: red;">*</span></label>
                                        <input type="text" id="quoteName" placeholder="Your Name *" 
                                               [(ngModel)]="quote.name" 
                                               name="quoteName" 
                                               required
                                               minlength="2"
                                               #quoteNameField="ngModel"
                                               [class.is-invalid]="quoteNameField.invalid && quoteNameField.touched">
                                        <div *ngIf="quoteNameField.invalid && quoteNameField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="quoteNameField.errors?.['required']">Name is required</div>
                                            <div *ngIf="quoteNameField.errors?.['minlength']">Name must be at least 2 characters</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="input-form">
                                        <label for="quoteEmail" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Email Address <span style="color: red;">*</span></label>
                                        <input type="email" id="quoteEmail" placeholder="Email Address *" 
                                               [(ngModel)]="quote.email" 
                                               name="quoteEmail" 
                                               required
                                               email
                                               #quoteEmailField="ngModel"
                                               [class.is-invalid]="quoteEmailField.invalid && quoteEmailField.touched">
                                        <div *ngIf="quoteEmailField.invalid && quoteEmailField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="quoteEmailField.errors?.['required']">Email is required</div>
                                            <div *ngIf="quoteEmailField.errors?.['email']">Please enter a valid email address</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-form">
                                        <label for="quoteContact" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Contact Number <span style="color: red;">*</span></label>
                                        <input type="tel" id="quoteContact" placeholder="Contact Number *" 
                                               [(ngModel)]="quote.contactNumber" 
                                               name="quoteContact" 
                                               required
                                               pattern="[0-9+\s\-()]+"
                                               minlength="10"
                                               #quoteContactField="ngModel"
                                               [class.is-invalid]="quoteContactField.invalid && quoteContactField.touched">
                                        <div *ngIf="quoteContactField.invalid && quoteContactField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="quoteContactField.errors?.['required']">Contact number is required</div>
                                            <div *ngIf="quoteContactField.errors?.['minlength']">Contact number must be at least 10 digits</div>
                                            <div *ngIf="quoteContactField.errors?.['pattern']">Please enter a valid contact number</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="select-items">
                                        <label for="select1" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Service Type <span style="color: red;">*</span></label>
                                        <select name="serviceType" id="select1" 
                                                [(ngModel)]="quote.serviceType" 
                                                required
                                                #serviceTypeField="ngModel"
                                                [class.is-invalid]="serviceTypeField.invalid && serviceTypeField.touched">
                                            <option value="">-- Select Service Type * --</option>
                                            <option value="Same-Day Delivery (Within City)">Same-Day Delivery (Within City)</option>
                                            <option value="Warehousing & Storage">Warehousing & Storage</option>
                                            <option value="Scheduled Deliveries (Business & Bulk Clients)">Scheduled Deliveries (Business & Bulk Clients)</option>
                                            <option value="Express Parcel Delivery">Express Parcel Delivery</option>
                                            <option value="Last-Mile Delivery for E-Commerce Businesses">Last-Mile Delivery for E-Commerce Businesses</option>
                                        </select>
                                        <div *ngIf="serviceTypeField.invalid && serviceTypeField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            Service type is required
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="input-form">
                                        <label for="pickupLocation" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Pickup Location <span style="color: red;">*</span></label>
                                        <input type="text" id="pickupLocation" placeholder="Pickup Location *" 
                                               [(ngModel)]="quote.pickupLocation" 
                                               name="pickupLocation" 
                                               required
                                               minlength="3"
                                               #pickupLocationField="ngModel"
                                               [class.is-invalid]="pickupLocationField.invalid && pickupLocationField.touched">
                                        <div *ngIf="pickupLocationField.invalid && pickupLocationField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="pickupLocationField.errors?.['required']">Pickup location is required</div>
                                            <div *ngIf="pickupLocationField.errors?.['minlength']">Pickup location must be at least 3 characters</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="input-form">
                                        <label for="deliveryDestination" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Delivery Destination <span style="color: red;">*</span></label>
                                        <input type="text" id="deliveryDestination" placeholder="Delivery Destination *" 
                                               [(ngModel)]="quote.deliveryDestination" 
                                               name="deliveryDestination" 
                                               required
                                               minlength="3"
                                               #deliveryDestinationField="ngModel"
                                               [class.is-invalid]="deliveryDestinationField.invalid && deliveryDestinationField.touched">
                                        <div *ngIf="deliveryDestinationField.invalid && deliveryDestinationField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="deliveryDestinationField.errors?.['required']">Delivery destination is required</div>
                                            <div *ngIf="deliveryDestinationField.errors?.['minlength']">Delivery destination must be at least 3 characters</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="input-form">
                                        <label for="packageWeight" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">Package Weight (kg) <span style="color: red;">*</span></label>
                                        <input type="text" id="packageWeight" placeholder="Package Weight (kg) *" 
                                               [(ngModel)]="quote.packageWeight" 
                                               name="packageWeight" 
                                               required
                                               pattern="[0-9.]+"
                                               #packageWeightField="ngModel"
                                               [class.is-invalid]="packageWeightField.invalid && packageWeightField.touched">
                                        <div *ngIf="packageWeightField.invalid && packageWeightField.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            <div *ngIf="packageWeightField.errors?.['required']">Package weight is required</div>
                                            <div *ngIf="packageWeightField.errors?.['pattern']">Please enter a valid weight (numbers only)</div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Radio Button -->
                                <div class="col-lg-12">
                                    <div class="radio-wrapper mb-30 mt-15">
                                        <label style="font-weight: 600; color: #333;">Additional Services <span style="color: red;">*</span></label>
                                        <div class="select-radio">
                                            <div class="radio">
                                                <input id="radio-1" name="additionalServices" type="radio" 
                                                       value="Standard" [(ngModel)]="quote.additionalServices" required>
                                                <label for="radio-1" class="radio-label">Standard</label>
                                            </div>
                                            <div class="radio">
                                                <input id="radio-2" name="additionalServices" type="radio" 
                                                       value="Express Delivery" [(ngModel)]="quote.additionalServices" required>
                                                <label for="radio-2" class="radio-label">Express Delivery</label>
                                            </div>
                                            <div class="radio">
                                                <input id="radio-4" name="additionalServices" type="radio" 
                                                       value="Insurance" [(ngModel)]="quote.additionalServices" required>
                                                <label for="radio-4" class="radio-label">Insurance</label>
                                            </div>
                                            <div class="radio">
                                                <input id="radio-5" name="additionalServices" type="radio" 
                                                       value="Custom Packaging" [(ngModel)]="quote.additionalServices" required>
                                                <label for="radio-5" class="radio-label">Custom Packaging</label>
                                            </div>
                                        </div>
                                        <div *ngIf="!quote.additionalServices && quoteForm.touched" style="color: red; font-size: 12px; margin-top: 5px;">
                                            Please select an additional service
                                        </div>
                                    </div> 
                                </div>
                                <!-- Button -->
                                <div class="col-lg-12">
                                    <button type="submit" class="submit-btn" 
                                            [disabled]="isSubmittingQuote || !quoteForm.valid">
                                        <span *ngIf="!isSubmittingQuote">Request a Quote</span>
                                        <span *ngIf="isSubmittingQuote">Submitting...</span>
                                    </button>
                                    <div *ngIf="!quoteForm.valid && quoteForm.touched" style="color: red; font-size: 12px; margin-top: 10px;">
                                        Please fill in all required fields correctly
                                    </div>
                                </div>
                            </div>
                        </form>	
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- contact-form end -->
    <!-- Why Choose QuickBox Area Start -->
    <div class="team-area section-padding30" style="background: #f8f9fa;">
        <div class="container">
            <div class="row justify-content-center">
                <div class="cl-xl-7 col-lg-8 col-md-10">
                    <!-- Section Tittle -->
                    <div class="section-tittle text-center mb-50">
                        <span>Final CTA</span>
                        <h2>Start With Confidence</h2>
                        <p style="color: #666; margin-top: 15px;">Test our service, experience our process, and scale without risk.</p>
                        <a href="https://wa.me/254118047315" target="_blank" rel="noopener" class="btn" style="margin-top: 25px; background: #25D366; color: white; padding: 15px 35px; border: none; border-radius: 8px;">Chat With Operations</a>
                    </div> 
                </div>
            </div>
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="background: white; padding: 40px 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        <div class="cat-icon" style="margin-bottom: 25px;">
                            <span class="flaticon-clock" style="font-size: 60px; color: #f15f22;"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; color: #333; font-size: 20px; min-height: 50px; display: flex; align-items: center; justify-content: center;">Lightning Fast Delivery</h5>
                            <p style="color: #666; line-height: 1.8; margin: 0;">Same-day delivery within Nairobi. Your urgent packages reach their destination in hours, not days.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="background: white; padding: 40px 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        <div class="cat-icon" style="margin-bottom: 25px;">
                            <span class="flaticon-shipped" style="font-size: 60px; color: #f15f22;"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; color: #333; font-size: 20px; min-height: 50px; display: flex; align-items: center; justify-content: center;">Real-Time Tracking</h5>
                            <p style="color: #666; line-height: 1.8; margin: 0;">Track your package every step of the way. Know exactly where your delivery is at any moment.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="background: white; padding: 40px 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        <div class="cat-icon" style="margin-bottom: 25px;">
                            <span class="flaticon-support" style="font-size: 60px; color: #f15f22;"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; color: #333; font-size: 20px; min-height: 50px; display: flex; align-items: center; justify-content: center;">Secure & Insured</h5>
                            <p style="color: #666; line-height: 1.8; margin: 0;">Your packages are protected with comprehensive insurance. Safe handling guaranteed from pickup to delivery.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="background: white; padding: 40px 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        <div class="cat-icon" style="margin-bottom: 25px;">
                            <span class="flaticon-place" style="font-size: 60px; color: #f15f22;"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; color: #333; font-size: 20px; min-height: 50px; display: flex; align-items: center; justify-content: center;">Nationwide Coverage</h5>
                            <p style="color: #666; line-height: 1.8; margin: 0;">Serving all areas of Nairobi and countrywide across Kenya. We deliver wherever you need us, when you need us.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="background: white; padding: 40px 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        <div class="cat-icon" style="margin-bottom: 25px;">
                            <span class="flaticon-ship" style="font-size: 60px; color: #f15f22;"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; color: #333; font-size: 20px; min-height: 50px; display: flex; align-items: center; justify-content: center;">Flexible Solutions</h5>
                            <p style="color: #666; line-height: 1.8; margin: 0;">From single parcels to bulk shipments, warehousing to scheduled deliveries - we've got you covered.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="background: white; padding: 40px 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); transition: transform 0.3s ease; height: 100%; display: flex; flex-direction: column;">
                        <div class="cat-icon" style="margin-bottom: 25px;">
                            <span class="flaticon-clock" style="font-size: 60px; color: #f15f22;"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; color: #333; font-size: 20px; min-height: 50px; display: flex; align-items: center; justify-content: center;">24/7 Customer Support</h5>
                            <p style="color: #666; line-height: 1.8; margin: 0;">We have a dedicated call center providing round-the-clock assistance. Our professional team is always ready to help with your delivery needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Why Choose QuickBox Area End -->
    <!--? How It Works Area Start -->
    <div class="testimonial-area testimonial-padding" style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 100px 0;">
        <div class="container">
            <!-- Section Tittle -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-tittle text-center mb-80">
                        <span style="color: rgba(255,255,255,0.9); font-size: 16px; letter-spacing: 2px;">Trust Signals & Proof</span>
                        <h2 style="color: white; margin-top: 15px; font-size: 42px;">Why Sellers Choose and Trust Quick Box</h2>
                        <p style="color: rgba(255,255,255,0.9); margin-top: 20px; font-size: 18px; max-width: 700px; margin-left: auto; margin-right: auto;">Documented deliveries at every stage • Real operational photos and videos • Pilot and early-client testimonials • Clear service standards and guarantees</p>
                        <p style="color: white; font-size: 20px; font-weight: 600; margin-top: 25px;">If we handle it, we document it—every order, every delivery, every payment.</p>
                    </div>
                </div>
            </div>
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 40px;">
                    <div class="text-center" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 50px 30px; border-radius: 20px; height: 100%; transition: transform 0.3s ease;">
                        <div style="width: 120px; height: 120px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                            <span class="flaticon-shipped" style="font-size: 60px; color: #001f3f;"></span>
                        </div>
                        <div style="width: 40px; height: 40px; background: #f15f22; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 20px; font-weight: bold;">1</div>
                        <h3 style="color: white; font-size: 24px; margin-bottom: 20px; font-weight: 600;">Book Your Delivery</h3>
                        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin: 0;">Create an order online or call us. Provide pickup and delivery addresses, and we'll handle the rest.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 40px;">
                    <div class="text-center" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 50px 30px; border-radius: 20px; height: 100%; transition: transform 0.3s ease;">
                        <div style="width: 120px; height: 120px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                            <span class="flaticon-support" style="font-size: 60px; color: #001f3f;"></span>
                        </div>
                        <div style="width: 40px; height: 40px; background: #f15f22; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 20px; font-weight: bold;">2</div>
                        <h3 style="color: white; font-size: 24px; margin-bottom: 20px; font-weight: 600;">We Pick & Track</h3>
                        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin: 0;">Our rider picks up your package and you can track its journey in real-time through our tracking system.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 40px;">
                    <div class="text-center" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 50px 30px; border-radius: 20px; height: 100%; transition: transform 0.3s ease;">
                        <div style="width: 120px; height: 120px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                            <span class="flaticon-clock" style="font-size: 60px; color: #001f3f;"></span>
                        </div>
                        <div style="width: 40px; height: 40px; background: #f15f22; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px; font-size: 20px; font-weight: bold;">3</div>
                        <h3 style="color: white; font-size: 24px; margin-bottom: 20px; font-weight: 600;">Fast Delivery</h3>
                        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin: 0;">Your package arrives safely at its destination. Same-day delivery available for urgent shipments.</p>
                    </div>
                </div>
            </div>
            <!-- Delivery Process Video -->
            <div class="row mt-80">
                <div class="col-lg-10 offset-lg-1">
                    <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px; text-align: center;">
                        <h3 style="color: white; font-size: 28px; margin-bottom: 30px; font-weight: 600;">Watch Our Delivery Process</h3>
                        <div style="background: #000; border-radius: 15px; overflow: hidden; max-width: 900px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                            <video #deliveryVideo controls style="width: 100%; max-height: 600px; display: block;">
                                <source *ngIf="deliveryVideoUrl" [src]="deliveryVideoUrl" type="video/mp4">
                                <source *ngIf="!deliveryVideoUrl" src="/assets/videos/Quickbox Web.MP4" type="video/mp4">
                                <source *ngIf="!deliveryVideoUrl" src="/assets/videos/Quickbox Web.mp4" type="video/mp4">
                                <source *ngIf="!deliveryVideoUrl" src="/assets/videos/delivery-process.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Quick Track Form -->
            <div class="row mt-80">
                <div class="col-lg-8 offset-lg-2">
                    <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px; text-align: center;">
                        <h3 style="color: white; font-size: 28px; margin-bottom: 25px; font-weight: 600;">Track Your Package Instantly</h3>
                        <form (ngSubmit)="trackPackage()" #trackForm2="ngForm" style="display: flex; gap: 15px; max-width: 600px; margin: 0 auto;">
                            <input type="text" placeholder="Enter your tracking ID" 
                                   [(ngModel)]="trackingId" name="trackingId2" required #trackingIdField2="ngModel"
                                   style="flex: 1; padding: 15px 20px; border: none; border-radius: 10px; font-size: 16px;">
                            <button type="submit" class="submit-btn" [disabled]="isTracking || !trackForm2.valid"
                                    style="background: #f15f22; color: white; padding: 15px 35px; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                                <span *ngIf="!isTracking">Track Now</span>
                                <span *ngIf="isTracking">Tracking...</span>
                            </button>
                        </form>
                        <div *ngIf="!trackForm2.valid && trackForm2.touched" style="color: #ffdede; margin-top: 10px; font-size: 13px;">
                            Please enter your tracking ID
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- How It Works Area End -->
    <!--? Service Coverage Map Area Start -->
    <div class="home-blog-area section-padding30" style="background: #ffffff; position: relative; overflow: hidden;">
        <!-- Background Pattern -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(45deg, rgba(241,95,34,0.03) 25%, transparent 25%, transparent 75%, rgba(241,95,34,0.03) 75%), linear-gradient(45deg, rgba(241,95,34,0.03) 25%, transparent 25%, transparent 75%, rgba(241,95,34,0.03) 75%); background-size: 60px 60px; background-position: 0 0, 30px 30px; opacity: 0.5;"></div>
        
        <div class="container" style="position: relative; z-index: 1;">
            <!-- Section Tittle -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-tittle text-center mb-80">
                        <span style="color: #f15f22; font-size: 16px; letter-spacing: 2px; font-weight: 600;">Coverage Area</span>
                        <h2 style="color: #333; margin-top: 15px; font-size: 42px; font-weight: 700;">Serving Nairobi & Countrywide</h2>
                        <p style="color: #666; margin-top: 20px; font-size: 18px; max-width: 700px; margin-left: auto; margin-right: auto;">From Westlands to Eastlands, Karen to Kasarani - we deliver everywhere in Nairobi and across Kenya</p>
                    </div>
                </div>
            </div>
            
            <!-- Map Visualization -->
            <div class="row" style="margin: 0 -15px; margin-bottom: 60px;">
                <div class="col-lg-12">
                    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 20px; padding: 60px 40px; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
                        <!-- Real-time Google Maps Embed -->
                        <div style="background: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); min-height: 500px;">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63820.992869414!2d36.821946!3d-1.292066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1704067200000!5m2!1sen!2sus"
                                width="100%" 
                                height="500" 
                                style="border:0; display: block;" 
                                allowfullscreen="" 
                                loading="lazy" 
                                referrerpolicy="no-referrer-when-downgrade"
                                title="Nairobi Coverage Map">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Service Areas Grid -->
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div style="background: white; padding: 30px 25px; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 100%; border-top: 4px solid #f15f22;">
                        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <span class="flaticon-place" style="font-size: 35px; color: white;"></span>
                        </div>
                        <h4 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 10px;">Westlands</h4>
                        <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">Same-day delivery available</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div style="background: white; padding: 30px 25px; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 100%; border-top: 4px solid #667eea;">
                        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <span class="flaticon-shipped" style="font-size: 35px; color: white;"></span>
                        </div>
                        <h4 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 10px;">Karen</h4>
                        <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">Express delivery zone</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div style="background: white; padding: 30px 25px; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 100%; border-top: 4px solid #4caf50;">
                        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <span class="flaticon-clock" style="font-size: 35px; color: white;"></span>
                        </div>
                        <h4 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 10px;">Eastlands</h4>
                        <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">24/7 service available</p>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div style="background: white; padding: 30px 25px; border-radius: 15px; text-align: center; box-shadow: 0 5px 20px rgba(0,0,0,0.08); transition: all 0.3s ease; height: 100%; border-top: 4px solid #ff9800;">
                        <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <span class="flaticon-support" style="font-size: 35px; color: white;"></span>
                        </div>
                        <h4 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 10px;">Kasarani</h4>
                        <p style="color: #666; font-size: 14px; margin: 0; line-height: 1.6;">Full service coverage</p>
                    </div>
                </div>
            </div>
            
            <!-- CTA Section -->
            <div class="row mt-60">
                <div class="col-lg-12">
                    <div style="background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 20px; padding: 50px 40px; text-align: center; box-shadow: 0 10px 40px rgba(241,95,34,0.3);">
                        <h3 style="color: white; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Ready to Experience Fast Delivery?</h3>
                        <p style="color: rgba(255,255,255,0.95); font-size: 18px; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto;">Join hundreds of satisfied customers across Nairobi. Get started with your first delivery today!</p>
                        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                            <a routerLink="/contact" class="btn" style="background: white; color: #f15f22; padding: 15px 40px; font-size: 18px; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(0,0,0,0.2);">
                                Get A Quote
                            </a>
                            <a routerLink="/services" class="btn" style="background: transparent; color: white; padding: 15px 40px; font-size: 18px; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block; transition: all 0.3s ease; border: 2px solid white;">
                                View Services
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Service Coverage Map Area End -->
</main>

<!-- Scroll Up -->
<div id="back-top" >
    <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
</div>
      `,
  styles: [`
    :host { display: block; width: 100%; }
    .home-main { margin: 0; padding: 0; max-width: none; }
    .is-invalid { border-color: #dc3545 !important; border-width: 2px !important; }
    .invalid-feedback { display: block; }
    .hero-slider-wrapper {
      width: 100vw; max-width: 100vw; min-height: 100vh; height: 100vh;
      overflow: hidden; position: relative;
      margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);
    }
    .hero-slider-track {
      display: flex; width: 100%; height: 100%; min-height: 100vh;
      transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .hero-slide {
      flex: 0 0 100vw; width: 100vw; min-width: 100vw; height: 100vh; min-height: 100vh;
      flex-shrink: 0;
      background-size: contain !important; background-position: center center !important; background-repeat: no-repeat !important;
    }
    .hero-dot {
      width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;
      background: transparent; cursor: pointer; padding: 0; transition: all 0.3s ease;
    }
    .hero-dot:hover, .hero-dot.active { background: #f15f22; border-color: #f15f22; }
  `]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  heroSlides = [
    { image: 'assets/img/hero/h1_hero.jpg' },
    { image: 'assets/img/hero/hero2.jpg' },
    { image: 'assets/img/hero/about.jpg' },
    { image: 'assets/img/pics/outside.jpeg' },
    { image: 'assets/img/pics/team.jpeg' },
    { image: 'assets/img/pics/9ACBBB17-8011-4D18-A1BC-58A91D8AB81A.jpg.jpeg' },
    { image: 'assets/img/pics/coridor.jpeg' }
  ];
  currentSlide = 0;
  private sliderInterval: any;

  trackingId = '';
  trackingResult: PackageResponse | null = null;
  isTracking = false;

  deliveryVideoUrl: string | null = null;
  private lastVideoUrl: string | null = null;
  private visibilityHandler: (() => void) | null = null;

  @ViewChild('deliveryVideo') deliveryVideoEl?: ElementRef<HTMLVideoElement>;

  quote: QuoteRequest = {
    name: '',
    email: '',
    contactNumber: '',
    serviceType: '',
    pickupLocation: '',
    deliveryDestination: '',
    packageWeight: '',
    additionalServices: 'Standard'
  };
  
  isSubmittingQuote = false;
  quoteSuccessMessage = '';
  quoteErrorMessage = '';

  constructor(
    private apiService: ApiService,
    private firebaseData: FirebaseDataService
  ) {}

  ngOnInit(): void {
    this.startSlider();
    this.loadDeliveryVideo();
    this.visibilityHandler = () => this.loadDeliveryVideo();
    document.addEventListener('visibilitychange', this.visibilityHandler);
  }

  ngAfterViewChecked(): void {
    if (this.deliveryVideoUrl && this.deliveryVideoUrl !== this.lastVideoUrl && this.deliveryVideoEl?.nativeElement) {
      this.lastVideoUrl = this.deliveryVideoUrl;
      this.deliveryVideoEl.nativeElement.load();
    }
  }

  loadDeliveryVideo(): void {
    this.firebaseData.getVideoInfo().then((info) => {
      if (info?.exists && info?.url) {
        this.deliveryVideoUrl = info.url;
      }
    }).catch(() => {});
  }

  ngOnDestroy(): void {
    this.pauseSlider();
    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler);
    }
  }

  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    }, 5000);
  }

  pauseSlider(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.sliderInterval = null;
    }
    setTimeout(() => this.startSlider(), 8000);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
  
  onImageError(event: any, imageName: string): void {
    if (imageName === 'about2') {
      event.target.src = '/assets/img/gallery/about2.jpg';
    } else {
      event.target.src = '/assets/img/gallery/about2.jpg';
    }
  }

  trackPackage() {
    const trackingId = (this.trackingId || '').trim();
    if (!trackingId || this.isTracking) return;
    
    this.isTracking = true;
    this.trackingResult = null;

    this.apiService.trackPackage(trackingId).subscribe({
      next: (response) => {
        this.trackingResult = response;
        this.isTracking = false;
      },
      error: (error) => {
        this.trackingResult = {
          success: false,
          message: error.error?.message || 'Package not found. Please check your tracking ID.',
          data: undefined
        };
        this.isTracking = false;
      }
    });
  }

  submitQuote() {
    if (this.isSubmittingQuote) return;
    
    // Validate all required fields
    if (!this.quote.name || !this.quote.email || !this.quote.contactNumber || 
        !this.quote.serviceType || !this.quote.pickupLocation || 
        !this.quote.deliveryDestination || !this.quote.packageWeight || 
        !this.quote.additionalServices) {
      this.quoteErrorMessage = 'Please fill in all required fields';
      return;
    }

    // Validate name (trim and check length)
    const trimmedName = this.quote.name.trim();
    if (trimmedName.length < 2) {
      this.quoteErrorMessage = 'Name must be at least 2 characters long';
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.quote.email)) {
      this.quoteErrorMessage = 'Please enter a valid email address';
      return;
    }

    // Validate contact number (at least 10 digits)
    const phoneRegex = /^[0-9+\s\-()]{10,}$/;
    if (!phoneRegex.test(this.quote.contactNumber.replace(/\s/g, ''))) {
      this.quoteErrorMessage = 'Please enter a valid contact number (at least 10 digits)';
      return;
    }

    // Validate package weight is a number
    if (isNaN(parseFloat(this.quote.packageWeight)) || parseFloat(this.quote.packageWeight) <= 0) {
      this.quoteErrorMessage = 'Please enter a valid package weight (must be a positive number)';
      return;
    }
    
    this.isSubmittingQuote = true;
    this.quoteSuccessMessage = '';
    this.quoteErrorMessage = '';

    this.apiService.submitQuoteRequest(this.quote).subscribe({
      next: (response) => {
        this.quoteSuccessMessage = response.message || 'Quote request submitted successfully! We will contact you soon.';
        // Reset form
        this.quote = {
          name: '',
          email: '',
          contactNumber: '',
          serviceType: '',
          pickupLocation: '',
          deliveryDestination: '',
          packageWeight: '',
          additionalServices: ''
        };
        this.isSubmittingQuote = false;
      },
      error: (error) => {
        this.quoteErrorMessage = error.error?.message || 'Failed to submit quote request. Please try again.';
        this.isSubmittingQuote = false;
      }
    });
  }
}
