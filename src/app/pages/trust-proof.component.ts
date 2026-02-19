import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-trust-proof',
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
                                <h2>Trust & Proof</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">Trust & Proof</a></li> 
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- slider Area End-->
        
        <!-- Trust & Proof Section -->
        <div class="trust-proof-area section-padding30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- Section Tittle -->
                        <div class="section-tittle text-center mb-80">
                            <span>Trust & Proof</span>
                            <h2>Built on Documentation, Accountability, and Trust</h2>
                            <p style="max-width: 800px; margin: 20px auto 0; color: #666; line-height: 1.8; font-size: 16px;">
                                Choosing the right fulfillment partner is a critical business decision. When Quick Box handles your orders, every action is documented. Nothing is hidden.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Why Choose QuickBox - City Sprint Style Trust Messaging -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center mb-60">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Why Choose QuickBox</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px;">Trust, reliability, and the best client experience—every time.</p>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; height: 100%; border-top: 4px solid #f15f22;">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 15px;">Trust</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">We handle your inventory and cash with transparency and accountability.</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; height: 100%; border-top: 4px solid #667eea;">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 15px;">Best Client Experience</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Dedicated support and real-time tracking for peace of mind.</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; height: 100%; border-top: 4px solid #4caf50;">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 15px;">Reliability & Efficiency</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Same-day Nairobi delivery. 24-hour outbound. On time, every time.</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); text-align: center; height: 100%; border-top: 4px solid #ff9800;">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 15px;">Remittance</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">COD collection with timely remittance on your preferred schedule.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Service Guarantees -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div style="background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); padding: 50px 40px; border-radius: 20px; color: white; text-align: center;">
                            <h3 style="color: white; font-size: 32px; font-weight: 700; margin-bottom: 30px;">Our Service Guarantees</h3>
                            <div class="row">
                                <div class="col-lg-4 col-md-4 mb-30">
                                    <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
                                        <h4 style="color: white; font-size: 22px; margin-bottom: 15px;">Same-Day Delivery</h4>
                                        <p style="color: rgba(255,255,255,0.95); line-height: 1.6; margin: 0;">Nairobi & express orders shipped the same day</p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 mb-30">
                                    <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
                                        <h4 style="color: white; font-size: 22px; margin-bottom: 15px;">24-Hour Delivery</h4>
                                        <p style="color: rgba(255,255,255,0.95); line-height: 1.6; margin: 0;">Outbound parcels reach destination within 24 hours</p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 mb-30">
                                    <div style="background: rgba(255,255,255,0.15); padding: 30px; border-radius: 15px; backdrop-filter: blur(10px);">
                                        <h4 style="color: white; font-size: 22px; margin-bottom: 15px;">Secure Handling</h4>
                                        <p style="color: rgba(255,255,255,0.95); line-height: 1.6; margin: 0;">Professional packing and secure storage guaranteed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Testimonials Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center mb-60">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 20px;">What Our Clients Say</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px;">Real feedback from e-commerce sellers who trust QuickBox</p>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6 mb-30">
                                <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%;">
                                    <div style="color: #f15f22; font-size: 48px; margin-bottom: 20px;">"</div>
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 25px; font-style: italic;">
                                        QuickBox has transformed our fulfillment process. Their COD collection is reliable, and we get our payouts on time. Highly recommended for e-commerce sellers.
                                    </p>
                                    <div style="border-top: 1px solid #eee; padding-top: 20px;">
                                        <strong style="color: #333; font-size: 18px;">Sarah M.</strong>
                                        <p style="color: #999; font-size: 14px; margin: 5px 0 0 0;">E-Commerce Seller, Nairobi</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-30">
                                <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%;">
                                    <div style="color: #f15f22; font-size: 48px; margin-bottom: 20px;">"</div>
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 25px; font-style: italic;">
                                        The transparency and communication from QuickBox is outstanding. We always know where our orders are, and their customer service team is responsive.
                                    </p>
                                    <div style="border-top: 1px solid #eee; padding-top: 20px;">
                                        <strong style="color: #333; font-size: 18px;">James K.</strong>
                                        <p style="color: #999; font-size: 14px; margin: 5px 0 0 0;">Online Retailer, Kisumu</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-30">
                                <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%;">
                                    <div style="color: #f15f22; font-size: 48px; margin-bottom: 20px;">"</div>
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 25px; font-style: italic;">
                                        Their warehouse facilities are secure and well-organized. We've been using QuickBox for over a year, and they've never let us down.
                                    </p>
                                    <div style="border-top: 1px solid #eee; padding-top: 20px;">
                                        <strong style="color: #333; font-size: 18px;">Mary W.</strong>
                                        <p style="color: #999; font-size: 14px; margin: 5px 0 0 0;">Fashion E-Commerce, Nairobi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Delivery Proof Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center mb-60">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Delivery Proof & Milestones</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px;">See our operational excellence in action</p>
                        </div>
                        <div class="row">
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                                    <div style="font-size: 48px; font-weight: 700; color: #f15f22; margin-bottom: 15px;">10,000+</div>
                                    <p style="color: #666; font-size: 16px; margin: 0;">Successful Deliveries</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                                    <div style="font-size: 48px; font-weight: 700; color: #f15f22; margin-bottom: 15px;">98%</div>
                                    <p style="color: #666; font-size: 16px; margin: 0;">On-Time Delivery Rate</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                                    <div style="font-size: 48px; font-weight: 700; color: #f15f22; margin-bottom: 15px;">500+</div>
                                    <p style="color: #666; font-size: 16px; margin: 0;">Active Clients</p>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
                                    <div style="font-size: 48px; font-weight: 700; color: #f15f22; margin-bottom: 15px;">24/7</div>
                                    <p style="color: #666; font-size: 16px; margin: 0;">Customer Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Operational Photos Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center mb-60">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 20px;">See Our Operations</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px;">People trust what they can see. Here's our operational transparency.</p>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 col-md-6 mb-30">
                                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                                    <img src="assets/img/pics/coridor.jpeg" alt="QuickBox Warehouse" 
                                         style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin-bottom: 20px; display: block;"
                                         onerror="this.onerror=null; this.src='assets/img/gallery/about2.jpg';">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 10px;">Secure Warehouse</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Organized pallet and rack storage with 24/7 security</p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-30">
                                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                                    <img src="assets/img/pics/team.jpeg" alt="QuickBox Delivery Team" 
                                         style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin-bottom: 20px; display: block;"
                                         onerror="this.onerror=null; this.src='assets/img/gallery/about2.jpg';">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 10px;">Professional Riders</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Trained delivery agents ensuring safe and timely deliveries</p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 mb-30">
                                <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                                    <img src="assets/img/pics/from%20truck.jpeg" alt="QuickBox Packing & Dispatch" 
                                         style="width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin-bottom: 20px; display: block;"
                                         onerror="this.onerror=null; this.src='assets/img/gallery/about2.jpg';">
                                    <h4 style="color: #333; font-size: 20px; margin-bottom: 10px;">Quality Packing</h4>
                                    <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Professional packing with high-quality materials</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Warehouse Video Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center mb-60">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Inside Our Warehouse</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px;">See our operations in action. Transparency builds trust.</p>
                        </div>
                        <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 900px; margin: 0 auto;">
                            <video controls style="width: 100%; border-radius: 10px; display: block;">
                                <source src="assets/img/pics/warehouse.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>

                <!-- Trust Building CTA -->
                <div class="row">
                    <div class="col-lg-12">
                        <div style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 60px 40px; border-radius: 20px; text-align: center; color: white;">
                            <h3 style="color: white; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Ready to Trust Quick Box?</h3>
                            <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 18px; max-width: 700px; margin: 0 auto 30px;">
                                Start with confidence. Test our service, experience our process, and scale without risk.
                            </p>
                            <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
                                <a href="https://wa.me/254118047315" target="_blank" rel="noopener" class="btn" style="background: #25D366; color: white; padding: 18px 45px; font-size: 18px; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block; transition: all 0.3s ease;">
                                    Chat With Operations
                                </a>
                                <a routerLink="/how-it-works" class="btn" style="background: transparent; color: white; padding: 18px 45px; font-size: 18px; font-weight: 600; border-radius: 10px; text-decoration: none; display: inline-block; transition: all 0.3s ease; border: 2px solid white;">
                                    Learn How It Works
                                </a>
                            </div>
                        </div>
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
export class TrustProofComponent {}

