import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { QuoteRequest } from '../models/quote.model';
import { PackageResponse } from '../models/package.model';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
<main>
    <!--? slider Area Start-->
    <div class="slider-area ">
        <div class="slider-active">
            <!-- Single Slider -->
            <div class="single-slider slider-height d-flex align-items-center">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-9 col-lg-9">
                            <div class="hero__caption">
                                <h1>Fast & Reliable <span>QuickBox</span> Delivery!</h1>
                            </div>
                            <!--Hero form -->
                            <form (ngSubmit)="trackPackage()" class="search-box">
                                <div class="input-form">
                                    <input type="text" placeholder="Your Tracking ID" 
                                           [(ngModel)]="trackingId" name="trackingId" required>
                                </div>
                                <div class="search-form">
                                    <button type="submit" [disabled]="isTracking" 
                                            style="background: #f15f22; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                                        Track Package
                                    </button>
                                </div>	
                            </form>	
                            <!-- Hero Pera -->
                            <div class="hero-pera">
                                <p>Track your package in real-time</p>
                            </div>
                            <!-- Tracking Results -->
                            <div *ngIf="trackingResult" class="mt-3" style="color: white;">
                                <div *ngIf="trackingResult.success && trackingResult.data" class="alert alert-success">
                                    <strong>Package Found!</strong><br>
                                    Status: {{ trackingResult.data.status }}<br>
                                    <span *ngIf="trackingResult.data.estimatedDelivery">
                                        Estimated Delivery: {{ trackingResult.data.estimatedDelivery | date }}
                                    </span>
                                </div>
                                <div *ngIf="!trackingResult.success" class="alert alert-danger">
                                    {{ trackingResult.message || 'Package not found' }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- slider Area End-->
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
                    <div class="section-tittle text-center mb-80">
                        <span>Our Services</span>
                        <h2>What QuickBox Can Do For You</h2>
                    </div>
                </div>
            </div>
            <div class="row" style="margin: 0 -15px;">
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-shipped"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 60px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">🚀 Same-Day Delivery (Within City)</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Fast and reliable delivery of parcels within the same city, ensuring urgent items reach their destination within hours.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-ship"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 60px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">🏬 Warehousing & Storage</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Secure and well-managed storage solutions for short-term and long-term goods, with organized inventory handling and quick dispatch support.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-6" style="padding: 0 15px; margin-bottom: 30px;">
                    <div class="single-cat text-center" style="height: 100%; display: flex; flex-direction: column; padding: 30px 20px;">
                        <div class="cat-icon" style="margin-bottom: 20px;">
                            <span class="flaticon-support"></span>
                        </div>
                        <div class="cat-cap" style="flex: 1;">
                            <h5 style="margin-bottom: 15px; min-height: 60px; display: flex; align-items: center; justify-content: center;"><a routerLink="/services" style="text-decoration: none; color: inherit;">⚡ Express Parcel Delivery</a></h5>
                            <p style="margin: 0; line-height: 1.8;">Priority handling and rapid transit for urgent parcels, offering the fastest delivery option with real-time tracking.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Categories Area End -->
    <!--? About Area Start -->
    <div class="about-low-area padding-bottom">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-12">
                    <div class="about-caption mb-50">
                        <!-- Section Tittle -->
                        <div class="section-tittle mb-35">
                            <span>About QuickBox</span>
                            <h2>Fast Delivery Solutions That Save Your Valuable Time!</h2>
                        </div>
                        <p>QuickBox is revolutionizing the delivery industry with innovative solutions that combine speed, reliability, and convenience. We understand that every package matters and every delivery deadline is critical.</p>
                        <p>Our state-of-the-art logistics network ensures your packages reach their destination safely and on time, every time. Experience the QuickBox difference today.</p>
                        <a routerLink="/about" class="btn">More About Us</a>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12">
                    <!-- about-img -->
                    <div class="about-img ">
                        <div class="about-font-img">
                            <img [src]="'/assets/img/gallery/about2.jpg'" alt="QuickBox Delivery" 
                                 (error)="onImageError($event, 'about2')"
                                 style="max-width: 100%; height: auto;">
                        </div>
                        <div class="about-back-img d-none d-lg-block">
                            <img [src]="'/assets/img/gallery/about1.jpg'" alt="QuickBox Services"
                                 (error)="onImageError($event, 'about1')"
                                 style="max-width: 100%; height: auto;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About Area End -->
    <!--? contact-form start -->
    <section class="contact-form-area section-bg  pt-115 pb-120 fix" data-background="assets/img/gallery/section_bg02.jpg">
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
                                        <input type="text" placeholder="Your Name" 
                                               [(ngModel)]="quote.name" name="quoteName" required>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="input-form">
                                        <input type="email" placeholder="Email Address" 
                                               [(ngModel)]="quote.email" name="quoteEmail" required>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="input-form">
                                        <input type="text" placeholder="Contact Number" 
                                               [(ngModel)]="quote.contactNumber" name="quoteContact" required>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="select-items">
                                        <select name="serviceType" id="select1" [(ngModel)]="quote.serviceType">
                                            <option value="">Service Type</option>
                                            <option value="Same-Day Delivery (Within City)">Same-Day Delivery (Within City)</option>
                                            <option value="Warehousing & Storage">Warehousing & Storage</option>
                                            <option value="Scheduled Deliveries (Business & Bulk Clients)">Scheduled Deliveries (Business & Bulk Clients)</option>
                                            <option value="Express Parcel Delivery">Express Parcel Delivery</option>
                                            <option value="Last-Mile Delivery for E-Commerce Businesses">Last-Mile Delivery for E-Commerce Businesses</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="input-form">
                                        <input type="text" placeholder="Pickup Location" 
                                               [(ngModel)]="quote.pickupLocation" name="pickupLocation">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="input-form">
                                        <input type="text" placeholder="Delivery Destination" 
                                               [(ngModel)]="quote.deliveryDestination" name="deliveryDestination">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6">
                                    <div class="input-form">
                                        <input type="text" placeholder="Package Weight (kg)" 
                                               [(ngModel)]="quote.packageWeight" name="packageWeight">
                                    </div>
                                </div>
                                <!-- Radio Button -->
                                <div class="col-lg-12">
                                    <div class="radio-wrapper mb-30 mt-15">
                                        <label>Additional Services:</label>
                                        <div class="select-radio">
                                            <div class="radio">
                                                <input id="radio-1" name="additionalServices" type="radio" 
                                                       value="Standard" [(ngModel)]="quote.additionalServices">
                                                <label for="radio-1" class="radio-label">Standard</label>
                                            </div>
                                            <div class="radio">
                                                <input id="radio-2" name="additionalServices" type="radio" 
                                                       value="Express Delivery" [(ngModel)]="quote.additionalServices">
                                                <label for="radio-2" class="radio-label">Express Delivery</label>
                                            </div>
                                            <div class="radio">
                                                <input id="radio-4" name="additionalServices" type="radio" 
                                                       value="Insurance" [(ngModel)]="quote.additionalServices">
                                                <label for="radio-4" class="radio-label">Insurance</label>
                                            </div>
                                            <div class="radio">
                                                <input id="radio-5" name="additionalServices" type="radio" 
                                                       value="Custom Packaging" [(ngModel)]="quote.additionalServices">
                                                <label for="radio-5" class="radio-label">Custom Packaging</label>
                                            </div>
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
                    <div class="section-tittle text-center mb-70">
                        <span>Why Choose Us</span>
                        <h2>Your Trusted Delivery Partner in Nairobi</h2>
                        <p style="color: #666; margin-top: 15px;">Experience the difference with QuickBox - where speed, reliability, and customer care come together</p>
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
                        <span style="color: rgba(255,255,255,0.9); font-size: 16px; letter-spacing: 2px;">Simple Process</span>
                        <h2 style="color: white; margin-top: 15px; font-size: 42px;">How QuickBox Works</h2>
                        <p style="color: rgba(255,255,255,0.9); margin-top: 20px; font-size: 18px; max-width: 600px; margin-left: auto; margin-right: auto;">Get your packages delivered in 3 simple steps</p>
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
                        <!-- Image placeholder - Replace with your image -->
                        <div style="margin-top: 30px; border-radius: 15px; overflow: hidden; background: rgba(255,255,255,0.1); min-height: 200px; display: flex; align-items: center; justify-content: center;">
                            <img src="/assets/img/gallery/delivery-step1.jpg" alt="Book Delivery" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; width: 100%; height: 200px; align-items: center; justify-content: center; color: rgba(255,255,255,0.7);">
                                <span class="flaticon-shipped" style="font-size: 80px;"></span>
                            </div>
                        </div>
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
                        <!-- Image placeholder - Replace with your image -->
                        <div style="margin-top: 30px; border-radius: 15px; overflow: hidden; background: rgba(255,255,255,0.1); min-height: 200px; display: flex; align-items: center; justify-content: center;">
                            <img src="/assets/img/gallery/delivery-step2.jpg" alt="Track Package" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; width: 100%; height: 200px; align-items: center; justify-content: center; color: rgba(255,255,255,0.7);">
                                <span class="flaticon-support" style="font-size: 80px;"></span>
                            </div>
                        </div>
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
                        <!-- Image placeholder - Replace with your image -->
                        <div style="margin-top: 30px; border-radius: 15px; overflow: hidden; background: rgba(255,255,255,0.1); min-height: 200px; display: flex; align-items: center; justify-content: center;">
                            <img src="/assets/img/gallery/delivery-step3.jpg" alt="Fast Delivery" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                            <div style="display: none; width: 100%; height: 200px; align-items: center; justify-content: center; color: rgba(255,255,255,0.7);">
                                <span class="flaticon-clock" style="font-size: 80px;"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Delivery Process Video -->
            <div class="row mt-80">
                <div class="col-lg-10 offset-lg-1">
                    <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px; text-align: center;">
                        <h3 style="color: white; font-size: 28px; margin-bottom: 30px; font-weight: 600;">Watch Our Delivery Process</h3>
                        <div style="background: #000; border-radius: 15px; overflow: hidden; max-width: 900px; margin: 0 auto; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                            <video controls style="width: 100%; max-height: 600px; display: block;">
                                <source src="/assets/videos/Quickbox Web.MP4" type="video/mp4">
                                <source src="/assets/videos/Quickbox Web.mp4" type="video/mp4">
                                <source src="/assets/videos/delivery-process.mp4" type="video/mp4">
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
                        <form (ngSubmit)="trackPackage()" style="display: flex; gap: 15px; max-width: 600px; margin: 0 auto;">
                            <input type="text" placeholder="Enter your tracking ID" 
                                   [(ngModel)]="trackingId" name="trackingId2" required
                                   style="flex: 1; padding: 15px 20px; border: none; border-radius: 10px; font-size: 16px;">
                            <button type="submit" class="submit-btn" [disabled]="isTracking"
                                    style="background: #f15f22; color: white; padding: 15px 35px; border: none; border-radius: 10px; font-size: 16px; font-weight: 600; cursor: pointer; white-space: nowrap;">
                                <span *ngIf="!isTracking">Track Now</span>
                                <span *ngIf="isTracking">Tracking...</span>
                            </button>
                        </form>
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
      `
})
export class HomeComponent {
  trackingId = '';
  trackingResult: PackageResponse | null = null;
  isTracking = false;

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

  constructor(private apiService: ApiService) {}
  
  onImageError(event: any, imageName: string): void {
    console.error(`Failed to load image: ${imageName}.jpg`);
    // Try alternative paths
    if (imageName === 'about1') {
      event.target.src = '/assets/img/gallery/about1.JPG';
    } else if (imageName === 'about2') {
      event.target.src = '/assets/img/gallery/about2.JPG';
    }
  }

  trackPackage() {
    if (!this.trackingId || this.isTracking) return;
    
    this.isTracking = true;
    this.trackingResult = null;

    this.apiService.trackPackage(this.trackingId).subscribe({
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
          additionalServices: 'Standard'
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

