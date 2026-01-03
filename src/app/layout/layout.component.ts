import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
<header>
    <!-- Header Start -->
    <div class="header-area">
        <div class="main-header ">
            <div class="header-top d-none d-lg-block">
                <div class="container">
                    <div class="col-xl-12">
                        <div class="row d-flex justify-content-between align-items-center">
                            <div class="header-info-left">
                                <ul style="display: flex; gap: 25px; margin: 0; padding: 0; list-style: none; align-items: center;">     
                                    <li style="margin: 0;">Phone: 0722 883443 / 0118047315</li>
                                    <li style="margin: 0;">Email: info&#64;quickboxcourier.co.ke</li>
                                </ul>
                            </div>
                            <div class="header-info-right">
                                <ul class="header-social" style="display: flex; gap: 15px; margin: 0; padding: 0; list-style: none; align-items: center;">    
                                    <li style="margin: 0;"><a href="#" style="text-decoration: none; color: inherit; font-size: 18px;"><i class="fab fa-twitter"></i></a></li>
                                    <li style="margin: 0;"><a href="#" style="text-decoration: none; color: inherit; font-size: 18px;"><i class="fab fa-facebook-f"></i></a></li>
                                    <li style="margin: 0;"><a href="#" style="text-decoration: none; color: inherit; font-size: 18px;"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li style="margin: 0;"><a href="#" style="text-decoration: none; color: inherit; font-size: 18px;"><i class="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom  header-sticky">
                <div class="container">
                    <div class="row align-items-center">
                        <!-- Logo -->
                        <div class="col-xl-2 col-lg-2 col-md-6 col-6">
                            <div class="logo">
                                <a routerLink="/">
                                    <!-- Logo Placeholder - Replace 'assets/img/logo/logo.png' with your logo path -->
                                    <!-- Exact dimensions: 180px width x 60px height -->
                                    <img 
                                        src="assets/img/logo/logo.png" 
                                        alt="QuickBox Logo" 
                                        style="width: 140px; height: 50px; object-fit: contain; display: block; max-width: 100%;"
                                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                    />
                                    <!-- Fallback if image not found -->
                                    <div style="display: none; align-items: center; height: 50px; width: 140px; background: #f15f22; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold; font-size: 20px; font-family: 'Teko', sans-serif;">
                                        QB
                                    </div>
                                </a>
                            </div>
                        </div>
                        <!-- Desktop Menu -->
                        <div class="col-xl-10 col-lg-10 d-none d-lg-block">
                            <div class="menu-wrapper d-flex align-items-center justify-content-end" style="gap: 30px;">
                                <!-- Main-menu -->
                                <div class="main-menu" style="flex: 1; max-width: 600px;">
                                    <nav> 
                                        <ul id="navigation" style="display: flex; gap: 30px; margin: 0; padding: 0; list-style: none; justify-content: flex-end;">                                                                                          
                                            <li><a routerLink="/" style="padding: 10px 0; display: flex; align-items: center; gap: 5px;"><i class="fas fa-home" style="font-size: 14px;"></i> Home</a></li>
                                            <li><a routerLink="/about" style="padding: 10px 0; display: flex; align-items: center; gap: 5px;"><i class="fas fa-info-circle" style="font-size: 14px;"></i> About</a></li>
                                            <li><a routerLink="/services" style="padding: 10px 0; display: flex; align-items: center; gap: 5px;"><span class="flaticon-shipped" style="font-size: 14px; color: #f15f22;"></span> Services</a></li>
                                            <li><a routerLink="/blog" style="padding: 10px 0; display: flex; align-items: center; gap: 5px;"><i class="fas fa-blog" style="font-size: 14px;"></i> Blog</a></li>
                                            <li><a routerLink="/contact" style="padding: 10px 0; display: flex; align-items: center; gap: 5px;"><i class="fas fa-envelope" style="font-size: 14px;"></i> Contact</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <!-- Header-btn -->
                                <div class="header-right-btn" style="display: flex; gap: 15px; align-items: center; flex-shrink: 0;">
                                    <a routerLink="/login" class="btn header-btn" style="background: #f15f22; padding: 12px 24px; border-radius: 5px; text-decoration: none; color: white; font-weight: 600; transition: all 0.3s ease; white-space: nowrap;">Login</a>
                                    <a routerLink="/contact" class="btn header-btn" style="white-space: nowrap;">Get A Quote</a>
                                </div>
                            </div>
                        </div>
                        <!-- Mobile Menu Toggle Button -->
                        <div class="col-md-6 col-6 d-lg-none text-end">
                            <button 
                                type="button" 
                                (click)="mobileMenuOpen = !mobileMenuOpen"
                                style="background: none; border: none; padding: 10px; cursor: pointer; font-size: 24px; color: #333;"
                                aria-label="Toggle menu">
                                <i [class]="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
                            </button>
                        </div>
                    </div>
                    <!-- Mobile Menu Dropdown -->
                    <div class="row d-lg-none" *ngIf="mobileMenuOpen" style="position: relative; z-index: 999;">
                        <div class="col-12">
                            <div class="mobile-menu-dropdown" style="background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; margin-top: 15px; padding: 10px 0;">
                                <nav>
                                    <ul style="list-style: none; padding: 0; margin: 0;">
                                        <li>
                                            <a routerLink="/" (click)="mobileMenuOpen = false" style="display: flex; align-items: center; padding: 15px 20px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; transition: all 0.3s; border-bottom: 1px solid #f0f0f0;">
                                                <i class="fas fa-home" style="margin-right: 12px; color: #f15f22; width: 20px; text-align: center;"></i>Home
                                            </a>
                                        </li>
                                        <li>
                                            <a routerLink="/services" (click)="mobileMenuOpen = false" style="display: flex; align-items: center; padding: 15px 20px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; transition: all 0.3s; border-bottom: 1px solid #f0f0f0;">
                                                <span class="flaticon-shipped" style="margin-right: 12px; color: #f15f22; width: 20px; text-align: center; font-size: 18px;"></span>Services
                                            </a>
                                        </li>
                                        <li>
                                            <a routerLink="/about" (click)="mobileMenuOpen = false" style="display: flex; align-items: center; padding: 15px 20px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; transition: all 0.3s; border-bottom: 1px solid #f0f0f0;">
                                                <i class="fas fa-info-circle" style="margin-right: 12px; color: #f15f22; width: 20px; text-align: center;"></i>About
                                            </a>
                                        </li>
                                        <li>
                                            <a routerLink="/login" (click)="mobileMenuOpen = false" style="display: flex; align-items: center; padding: 15px 20px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; transition: all 0.3s; border-bottom: 1px solid #f0f0f0;">
                                                <i class="fas fa-sign-in-alt" style="margin-right: 12px; color: #f15f22; width: 20px; text-align: center;"></i>Login
                                            </a>
                                        </li>
                                        <li>
                                            <a routerLink="/contact" (click)="mobileMenuOpen = false" style="display: flex; align-items: center; padding: 15px 20px; text-decoration: none; color: #333; font-weight: 500; font-size: 16px; transition: all 0.3s;">
                                                <i class="fas fa-quote-left" style="margin-right: 12px; color: #f15f22; width: 20px; text-align: center;"></i>Get A Quote
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <!-- Mobile Menu Backdrop -->
                    <div class="d-lg-none" *ngIf="mobileMenuOpen" 
                         (click)="mobileMenuOpen = false"
                         style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3); z-index: 998; animation: fadeIn 0.2s ease;"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Header End -->
</header>
<router-outlet></router-outlet>
<footer>
    <!--? Footer Start-->
    <div class="footer-area footer-bg">
        <div class="container">
            <div class="footer-top footer-padding">
                <!-- footer Heading -->
                <div class="footer-heading">
                    <div class="row justify-content-between">
                        <div class="col-xl-6 col-lg-8 col-md-8">
                            <div class="wantToWork-caption wantToWork-caption2">
                                <h2>We Deliver Excellence, One Box At A Time!</h2>
                            </div>
                        </div>
                        <div class="col-xl-3 col-lg-4">
                            <span class="contact-number f-right">0722 883443 / 0118047315</span>
                        </div>
                    </div>
                </div>
                <!-- Footer Menu -->
                <div class="row d-flex justify-content-between" style="margin: 0 -15px;">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px;">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4 style="margin-bottom: 25px;">COMPANY</h4>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    <li style="margin-bottom: 12px;"><a routerLink="/about" style="text-decoration: none; color: inherit;">About Us</a></li>
                                    <li style="margin-bottom: 12px;"><a href="#" style="text-decoration: none; color: inherit;">Our Team</a></li>
                                    <li style="margin-bottom: 12px;"><a routerLink="/blog" style="text-decoration: none; color: inherit;">Press & Blog</a></li>
                                    <li style="margin-bottom: 12px;"><a href="#" style="text-decoration: none; color: inherit;">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px;">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4 style="margin-bottom: 25px;">Open Hours</h4>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    <li style="margin-bottom: 12px;"><a href="#" style="text-decoration: none; color: inherit;">Monday 8am-8pm</a></li>
                                    <li style="margin-bottom: 12px;"><a href="#" style="text-decoration: none; color: inherit;">Tuesday-Friday 8am-8pm</a></li>
                                    <li style="margin-bottom: 12px;"><a href="#" style="text-decoration: none; color: inherit;">Saturday 9am-6pm</a></li>
                                    <li style="margin-bottom: 12px;"><a href="#" style="text-decoration: none; color: inherit;">Sunday 10am-4pm</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px;">
                        <div class="single-footer-caption mb-50">
                            <div class="footer-tittle">
                                <h4 style="margin-bottom: 25px;">SERVICES</h4>
                                <ul style="list-style: none; padding: 0; margin: 0;">
                                    <li style="margin-bottom: 12px;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Same-Day Delivery</a></li>
                                    <li style="margin-bottom: 12px;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Warehousing & Storage</a></li>
                                    <li style="margin-bottom: 12px;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Scheduled Deliveries</a></li>
                                    <li style="margin-bottom: 12px;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Express Parcel Delivery</a></li>
                                    <li style="margin-bottom: 12px;"><a routerLink="/services" style="text-decoration: none; color: inherit;">Last-Mile Delivery</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6" style="padding: 0 15px;">
                        <div class="single-footer-caption mb-50">
                            <!-- logo -->
                            <div class="footer-logo" style="margin-bottom: 25px;">
                                <a routerLink="/">
                                    <!-- Footer Logo - Same image as header logo -->
                                    <!-- Exact dimensions: 150px width x 50px height -->
                                    <img 
                                        src="assets/img/logo/logo.png" 
                                        alt="QuickBox Logo" 
                                        style="width: 150px; height: 50px; object-fit: contain; display: block;"
                                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                                    />
                                    <!-- Fallback if image not found -->
                                    <div style="display: none; align-items: center; height: 50px; width: 150px; background: #f15f22; color: white; padding: 8px 12px; border-radius: 5px; font-weight: bold; font-size: 20px; font-family: 'Teko', sans-serif;">
                                        QB
                                    </div>
                                </a>
                            </div>
                            <div class="footer-tittle">
                                <div class="footer-pera" style="margin-bottom: 25px;">
                                    <p class="info1" style="line-height: 1.8; margin-bottom: 0;">QuickBox delivers fast, reliable shipping solutions. We understand the importance of getting your packages where they need to be, when they need to be there.</p>
                                </div>
                            </div>
                            <!-- Footer Social -->
                            <div class="footer-social" style="display: flex; gap: 15px;">
                                <a href="#" style="text-decoration: none; color: inherit; font-size: 20px;"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" style="text-decoration: none; color: inherit; font-size: 20px;"><i class="fab fa-twitter"></i></a>
                                <a href="#" style="text-decoration: none; color: inherit; font-size: 20px;"><i class="fas fa-globe"></i></a>
                                <a href="#" style="text-decoration: none; color: inherit; font-size: 20px;"><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <div class="row d-flex align-items-center">
                    <div class="col-lg-12">
                        <div class="footer-copy-right text-center">
                            <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script> QuickBox. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Footer End-->
</footer>
  `
})
export class LayoutComponent {
  mobileMenuOpen = false;
}

