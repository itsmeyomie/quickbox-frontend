import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-services',
  imports: [RouterLink],
  template: `
    <main>
        <!--? slider Area Start-->
        <div class="slider-area ">
            <div class="single-slider hero-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap">
                                <h2>Our Services</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">Our Services</a></li> 
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- slider Area End-->
        <!--? Categories Area Start -->
        <div class="categories-area section-padding30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- Section Tittle -->
                        <div class="section-tittle text-center mb-80">
                            <span>QuickBox Services</span>
                            <h2>Comprehensive Delivery Solutions</h2>
                            <p>Professional logistics and delivery services tailored to meet all your shipping and storage needs in Nairobi, Kenya.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-shipped"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">🚀 Same-Day Delivery (Within City)</a></h5>
                                <p>Fast and reliable delivery of parcels within the same city, ensuring urgent items reach their destination within hours.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-ship"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">🏬 Warehousing & Storage</a></h5>
                                <p>Secure and well-managed storage solutions for short-term and long-term goods, with organized inventory handling and quick dispatch support.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-clock"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">📅 Scheduled Deliveries (Business & Bulk Clients)</a></h5>
                                <p>Planned and recurring delivery services tailored for businesses handling bulk shipments or routine dispatch schedules.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-support"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">⚡ Express Parcel Delivery</a></h5>
                                <p>Priority handling and rapid transit for urgent parcels, offering the fastest delivery option with real-time tracking.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-place"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">📦 Last-Mile Delivery for E-Commerce Businesses</a></h5>
                                <p>Efficient doorstep delivery solutions for online stores, ensuring timely, accurate, and customer-friendly final-mile fulfillment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Categories Area End -->

    </main>

    <!-- Scroll Up -->
    <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `
})
export class ServicesComponent {}

