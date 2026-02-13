import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-how-it-works',
  imports: [RouterLink],
  template: `
    <main>
        <!--? slider Area Start-->
        <div class="slider-area ">
            <div class="single-slider hero-overly slider-height2 d-flex align-items-center" data-background="assets/img/pics/outside.jpeg" style="padding: 80px 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                                <h2>How It Works</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">How It Works</a></li> 
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- slider Area End-->
        
        <!-- How It Works Process Section -->
        <div class="how-it-works-area section-padding30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- Section Tittle -->
                        <div class="section-tittle text-center mb-80">
                            <span>Our Process</span>
                            <h2>How QuickBox Fulfillment Works</h2>
                            <p style="max-width: 800px; margin: 20px auto 0; color: #666; line-height: 1.8; font-size: 16px;">
                                We've designed a simple, transparent process that removes uncertainty and builds trust. Here's exactly what happens from start to finish.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Step-by-Step Process -->
                <div class="row">
                    <!-- Step 1: Seller Sends Inventory -->
                    <div class="col-lg-6 col-md-6 mb-40">
                        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-left: 5px solid #f15f22;">
                            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                                    <span style="color: white; font-size: 28px; font-weight: bold;">1</span>
                                </div>
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Seller Sends Inventory</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                You send your inventory to our secure warehouse. We receive, inspect, and organize your products for efficient order fulfillment. Our warehouse team ensures everything is properly catalogued and ready for dispatch.
                            </p>
                        </div>
                    </div>

                    <!-- Step 2: Orders Received -->
                    <div class="col-lg-6 col-md-6 mb-40">
                        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-left: 5px solid #667eea;">
                            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                                    <span style="color: white; font-size: 28px; font-weight: bold;">2</span>
                                </div>
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Orders Received</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                Orders are placed on your website or sales platform and automatically shared with QuickBox via Google Sheets (mobile app and fully integrated API system coming soon). Our system processes each order immediately.
                            </p>
                        </div>
                    </div>

                    <!-- Step 3: Call Centre Processing -->
                    <div class="col-lg-6 col-md-6 mb-40">
                        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-left: 5px solid #4caf50;">
                            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                                    <span style="color: white; font-size: 28px; font-weight: bold;">3</span>
                                </div>
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Call Centre Processing</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                Our dedicated Call Centre Team processes each order, scheduling deliveries through customer confirmation calls. We make up to 3 call attempts and follow up for 3 consecutive days if a client is unreachable—ensuring no order is missed.
                            </p>
                        </div>
                    </div>

                    <!-- Step 4: Delivery & COD Collection -->
                    <div class="col-lg-6 col-md-6 mb-40">
                        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-left: 5px solid #ff9800;">
                            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                                    <span style="color: white; font-size: 28px; font-weight: bold;">4</span>
                                </div>
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Delivery & COD Collection</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                Our Operations Team prepares parcels for dispatch. Nairobi & express orders ship the same day; outbound parcels reach their destination within 24 hours. For COD orders, our agents collect payment and remit funds based on your preferred schedule.
                            </p>
                        </div>
                    </div>

                    <!-- Step 5: Returns Handling -->
                    <div class="col-lg-6 col-md-6 mb-40">
                        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-left: 5px solid #9c27b0;">
                            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                                    <span style="color: white; font-size: 28px; font-weight: bold;">5</span>
                                </div>
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Returns Handling</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                In case of defects or mismatched specifications, we facilitate exchanges while keeping both you and the buyer fully informed at every step. Our returns process is transparent and efficient.
                            </p>
                        </div>
                    </div>

                    <!-- Step 6: COD Payout Timeline -->
                    <div class="col-lg-6 col-md-6 mb-40">
                        <div style="background: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-left: 5px solid #e91e63;">
                            <div style="display: flex; align-items: center; margin-bottom: 25px;">
                                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #e91e63 0%, #f06292 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0;">
                                    <span style="color: white; font-size: 28px; font-weight: bold;">6</span>
                                </div>
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">COD Payout Timeline</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                For Cash on Delivery orders, our agents collect payment and remit funds or payment confirmations based on your preferred remittance schedule. You choose the frequency that works best for your cash flow.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Trust Building Section -->
                <div class="row mt-80">
                    <div class="col-lg-12">
                        <div style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 60px 40px; border-radius: 20px; text-align: center; color: white;">
                            <h3 style="color: white; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Why This Process Builds Trust</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 18px; max-width: 800px; margin: 0 auto 30px;">
                                Uncertainty kills conversions. Our step-by-step process removes fear by replacing assumptions with clarity. You know exactly what happens at every stage, and we keep you informed throughout.
                            </p>
                            <div class="row" style="margin-top: 40px;">
                                <div class="col-lg-4 col-md-4 mb-30">
                                    <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
                                        <h4 style="color: white; font-size: 20px; margin-bottom: 15px;">Transparency</h4>
                                        <p style="color: rgba(255,255,255,0.9); line-height: 1.6; margin: 0;">You see every step of the process</p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 mb-30">
                                    <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
                                        <h4 style="color: white; font-size: 20px; margin-bottom: 15px;">Reliability</h4>
                                        <p style="color: rgba(255,255,255,0.9); line-height: 1.6; margin: 0;">Consistent processes you can count on</p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 mb-30">
                                    <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
                                        <h4 style="color: white; font-size: 20px; margin-bottom: 15px;">Communication</h4>
                                        <p style="color: rgba(255,255,255,0.9); line-height: 1.6; margin: 0;">We keep you informed at every step</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CTA Section -->
                <div class="row mt-60">
                    <div class="col-lg-12 text-center">
                        <a routerLink="/contact" class="btn" style="background: #f15f22; color: white; padding: 18px 45px; font-size: 18px; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(241,95,34,0.3);">
                            Get Started Today
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Scroll Up -->
    <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `
})
export class HowItWorksComponent {}


