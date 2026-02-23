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
                            <h2>How Quick Box Fulfillment Works</h2>
                            <p style="max-width: 800px; margin: 20px auto 0; color: #666; line-height: 1.8; font-size: 16px;">
                                Logistics should never feel uncertain. At Quick Box, we believe clarity builds trust. Every step is trackable, documented, and handled with full accountability.
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
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Inventory Receiving</h3>
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
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Order Processing</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                Orders come in from your website, social channels, or WhatsApp and flow into Quick Box through our integration platform. We seamlessly connect with any system—e-commerce platforms, marketplaces, Google Sheets, or custom APIs. Our system processes each order immediately.
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
                                <h3 style="color: #333; font-size: 24px; font-weight: 700; margin: 0;">Packing & Dispatch</h3>
                            </div>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin: 0;">
                                Our Operations Team picks, packs, and prepares parcels for dispatch. Nairobi & express orders ship the same day; outbound parcels reach their destination within 24 hours. Professional packing and optional custom branding are available.
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
                                Our trained riders and agents deliver across Kenya using clear delivery protocols. For COD orders, payments are collected securely at delivery and reconciled transparently. Each handover is documented to improve delivery success rates.
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
                                Failed deliveries and customer returns are logged, documented, and processed transparently. Returned inventory is accounted for and safely managed. Both you and the buyer stay informed at every step.
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
                                COD payments are reconciled transparently and paid out based on clearly communicated and agreed timelines. You receive funds on schedule—no surprises, no delays.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Trust Building Section -->
                <div class="row mt-80">
                    <div class="col-lg-12">
                        <div style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 60px 40px; border-radius: 20px; text-align: center; color: white;">
                            <h3 style="color: white; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Every Step Is Trackable and Documented</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 18px; max-width: 800px; margin: 0 auto 30px;">
                                If we handle it, we document it—every order, every delivery, every payment. Nothing is hidden. Our process removes uncertainty and builds trust at every stage.
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
                        <a href="https://wa.me/254118047315" target="_blank" rel="noopener" class="btn" style="background: #25D366; color: white; padding: 18px 45px; font-size: 18px; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(37,211,102,0.3);">
                            Talk to Our Operations Team
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


