import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <main>
        <!--? Hero Section Start-->
        <div class="slider-area">
            <div class="single-slider hero-overly slider-height2 d-flex align-items-center" style="background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); min-height: 400px;">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap text-center">
                                <h2 style="color: white; font-size: 48px; font-weight: 700; margin-bottom: 20px;">QuickBox Insights</h2>
                                <p style="color: rgba(255,255,255,0.95); font-size: 20px; max-width: 600px; margin: 0 auto;">Expert tips, industry insights, and delivery solutions</p>
                                <nav aria-label="breadcrumb" style="margin-top: 30px;">
                                    <ol class="breadcrumb" style="justify-content: center; background: transparent; padding: 0;">
                                        <li class="breadcrumb-item"><a routerLink="/" style="color: rgba(255,255,255,0.9);">Home</a></li>
                                        <li class="breadcrumb-item active" style="color: white;">Insights</li> 
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Hero Section End-->

        <!--? Insights & Resources Area Start -->
        <section class="blog_area section-padding" style="background: #f8f9fa; padding: 100px 0;">
            <div class="container">
                <!-- Section Header -->
                <div class="row mb-80">
                    <div class="col-lg-12 text-center">
                        <span style="color: #f15f22; font-size: 16px; letter-spacing: 2px; font-weight: 600;">Resources</span>
                        <h2 style="color: #333; font-size: 42px; font-weight: 700; margin-top: 15px; margin-bottom: 20px;">Everything You Need to Know</h2>
                        <p style="color: #666; font-size: 18px; max-width: 700px; margin: 0 auto;">Discover valuable insights, tips, and guides to optimize your delivery experience with QuickBox</p>
                    </div>
                </div>

                <!-- Main Content Grid -->
                <div class="row" style="margin: 0 -15px;">
                    <!-- Left Column - Main Articles -->
                    <div class="col-lg-8 mb-5 mb-lg-0" style="padding: 0 15px;">
                        <!-- Article 1 -->
                        <article style="background: white; border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 0 5px 25px rgba(0,0,0,0.08); transition: transform 0.3s ease;">
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <span class="flaticon-shipped" style="font-size: 40px; color: white;"></span>
                                </div>
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                                        <span style="background: rgba(241,95,34,0.1); color: #f15f22; padding: 5px 15px; border-radius: 20px; font-size: 13px; font-weight: 600;">Delivery Tips</span>
                                        <span style="color: #999; font-size: 14px;">January 15, 2024</span>
                                    </div>
                                    <h3 style="color: #333; font-size: 28px; font-weight: 700; margin: 0; line-height: 1.3;">
                                        5 Essential Tips for Faster Package Delivery
                                    </h3>
                                </div>
                            </div>
                            <p style="color: #666; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">Learn how to optimize your shipping process and get your packages delivered faster with these expert tips from QuickBox. From proper packaging to choosing the right service level, we'll guide you through everything you need to know.</p>
                            <div style="display: flex; align-items: center; gap: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                                <span style="color: #f15f22; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
                                    Featured Article
                                </span>
                                <span style="color: #999; font-size: 14px;"><i class="far fa-clock" style="margin-right: 5px;"></i> 5 min read</span>
                            </div>
                        </article>

                        <!-- Article 2 -->
                        <article style="background: white; border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 0 5px 25px rgba(0,0,0,0.08); transition: transform 0.3s ease;">
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #5dade2 0%, #3498db 100%); border-radius: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <span class="flaticon-support" style="font-size: 40px; color: white;"></span>
                                </div>
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                                        <span style="background: rgba(93,173,226,0.1); color: #5dade2; padding: 5px 15px; border-radius: 20px; font-size: 13px; font-weight: 600;">Packaging Guide</span>
                                        <span style="color: #999; font-size: 14px;">January 12, 2024</span>
                                    </div>
                                    <h3 style="color: #333; font-size: 28px; font-weight: 700; margin: 0; line-height: 1.3;">
                                        How to Choose the Right Packaging for Your Shipments
                                    </h3>
                                </div>
                            </div>
                            <p style="color: #666; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">Discover the best packaging solutions for your products to ensure safe delivery and customer satisfaction. We'll help you select the right materials, sizes, and protective measures for different types of shipments.</p>
                            <div style="display: flex; align-items: center; gap: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                                <span style="color: #5dade2; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
                                    Featured Article
                                </span>
                                <span style="color: #999; font-size: 14px;"><i class="far fa-clock" style="margin-right: 5px;"></i> 7 min read</span>
                            </div>
                        </article>

                        <!-- Article 3 -->
                        <article style="background: white; border-radius: 20px; padding: 40px; margin-bottom: 40px; box-shadow: 0 5px 25px rgba(0,0,0,0.08); transition: transform 0.3s ease;">
                            <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 15px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <span class="flaticon-clock" style="font-size: 40px; color: white;"></span>
                                </div>
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                                        <span style="background: rgba(76,175,80,0.1); color: #4caf50; padding: 5px 15px; border-radius: 20px; font-size: 13px; font-weight: 600;">Business Solutions</span>
                                        <span style="color: #999; font-size: 14px;">January 8, 2024</span>
                                    </div>
                                    <h3 style="color: #333; font-size: 28px; font-weight: 700; margin: 0; line-height: 1.3;">
                                        Streamlining E-Commerce Delivery for Nairobi Businesses
                                    </h3>
                                </div>
                            </div>
                            <p style="color: #666; font-size: 16px; line-height: 1.8; margin-bottom: 25px;">Everything you need to know about optimizing your e-commerce delivery operations in Nairobi. Learn how QuickBox helps businesses scale their shipping operations efficiently and cost-effectively.</p>
                            <div style="display: flex; align-items: center; gap: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                                <span style="color: #4caf50; font-weight: 600; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
                                    Featured Article
                                </span>
                                <span style="color: #999; font-size: 14px;"><i class="far fa-clock" style="margin-right: 5px;"></i> 10 min read</span>
                            </div>
                        </article>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="col-lg-4" style="padding: 0 15px;">
                        <!-- Quick Links Card -->
                        <div style="background: white; border-radius: 20px; padding: 35px; margin-bottom: 30px; box-shadow: 0 5px 25px rgba(0,0,0,0.08);">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #f15f22;">Quick Links</h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 15px;">
                                    <a routerLink="/services" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: #666; transition: color 0.3s; padding: 10px; border-radius: 8px; transition: all 0.3s;">
                                        <span class="flaticon-shipped" style="color: #f15f22; font-size: 20px;"></span>
                                        <span>Our Services</span>
                                    </a>
                                </li>
                                <li style="margin-bottom: 15px;">
                                    <a routerLink="/contact" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: #666; transition: color 0.3s; padding: 10px; border-radius: 8px; transition: all 0.3s;">
                                        <span class="flaticon-support" style="color: #5dade2; font-size: 20px;"></span>
                                        <span>Get a Quote</span>
                                    </a>
                                </li>
                                <li style="margin-bottom: 15px;">
                                    <a routerLink="/about" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: #666; transition: color 0.3s; padding: 10px; border-radius: 8px; transition: all 0.3s;">
                                        <span class="flaticon-clock" style="color: #4caf50; font-size: 20px;"></span>
                                        <span>About QuickBox</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- Categories Card -->
                        <div style="background: white; border-radius: 20px; padding: 35px; margin-bottom: 30px; box-shadow: 0 5px 25px rgba(0,0,0,0.08);">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 2px solid #f15f22;">Categories</h4>
                            <ul style="list-style: none; padding: 0; margin: 0;">
                                <li style="margin-bottom: 12px;">
                                    <a href="#" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: #666; padding: 10px 0; border-bottom: 1px solid #f0f0f0; transition: color 0.3s;">
                                        <span>Delivery Tips</span>
                                        <span style="background: #f15f22; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">12</span>
                                    </a>
                                </li>
                                <li style="margin-bottom: 12px;">
                                    <a href="#" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: #666; padding: 10px 0; border-bottom: 1px solid #f0f0f0; transition: color 0.3s;">
                                        <span>Packaging</span>
                                        <span style="background: #5dade2; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">8</span>
                                    </a>
                                </li>
                                <li style="margin-bottom: 12px;">
                                    <a href="#" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: #666; padding: 10px 0; border-bottom: 1px solid #f0f0f0; transition: color 0.3s;">
                                        <span>Business Solutions</span>
                                        <span style="background: #4caf50; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">15</span>
                                    </a>
                                </li>
                                <li style="margin-bottom: 12px;">
                                    <a href="#" style="display: flex; justify-content: space-between; align-items: center; text-decoration: none; color: #666; padding: 10px 0; border-bottom: 1px solid #f0f0f0; transition: color 0.3s;">
                                        <span>Industry News</span>
                                        <span style="background: #ff9800; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;">10</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <!-- CTA Card -->
                        <div style="background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 20px; padding: 40px; text-align: center; box-shadow: 0 10px 40px rgba(241,95,34,0.3);">
                            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 25px;">
                                <span class="flaticon-support" style="font-size: 40px; color: white;"></span>
                            </div>
                            <h4 style="color: white; font-size: 24px; font-weight: 700; margin-bottom: 15px;">Need Help?</h4>
                            <p style="color: rgba(255,255,255,0.95); font-size: 16px; margin-bottom: 25px; line-height: 1.6;">Our team is here to assist you with all your delivery needs.</p>
                            <a routerLink="/contact" style="background: white; color: #f15f22; padding: 12px 30px; border-radius: 10px; text-decoration: none; font-weight: 600; display: inline-block; transition: all 0.3s;">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Insights & Resources Area End -->
    </main>

    <!-- Scroll Up -->
    <div id="back-top">
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `
})
export class BlogComponent {}
