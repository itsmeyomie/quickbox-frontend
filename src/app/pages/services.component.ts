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
            <div class="single-slider hero-overly slider-height2 d-flex align-items-center" data-background="assets/img/pics/outside.jpeg" style="padding: 80px 0;">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap" style="text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
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
                <!-- Services Value Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle text-center mb-60">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Why Clients Choose Our Services</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px;">We deliver results that matter—reliability, peace of mind, and growth for your business.</p>
                        </div>
                    </div>
                    <!-- Order Fulfillment -->
                    <div class="col-lg-4 col-md-6 mb-40">
                        <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-top: 4px solid #f15f22;">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 20px;">Order Fulfillment</h4>
                            <p style="color: #666; line-height: 1.8; font-size: 15px; margin: 0;">Stop juggling inventory and packing—we receive, store, pick, pack, and ship your orders seamlessly across Kenya. Hand us the complexity so you can focus on what you do best: growing your business.</p>
                        </div>
                    </div>
                    <!-- Last-Mile Delivery -->
                    <div class="col-lg-4 col-md-6 mb-40">
                        <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-top: 4px solid #667eea;">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 20px;">Last-Mile Delivery</h4>
                            <p style="color: #666; line-height: 1.8; font-size: 15px; margin: 0;">We deliver parcels accurately and professionally—right to your customer's doorstep. Our last-mile service and COD management turn one-time buyers into loyal repeat customers who trust your brand.</p>
                        </div>
                    </div>
                    <!-- Cash on Delivery -->
                    <div class="col-lg-4 col-md-6 mb-40">
                        <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-top: 4px solid #4caf50;">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 20px;">Cash on Delivery</h4>
                            <p style="color: #666; line-height: 1.8; font-size: 15px; margin: 0;">Our trained agents collect payments securely and remit funds on your preferred schedule. You get reliable cash flow without the hassle or risk of handling COD yourself.</p>
                        </div>
                    </div>
                    <!-- Warehousing -->
                    <div class="col-lg-4 col-md-6 mb-40">
                        <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-top: 4px solid #ff9800;">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 20px;">Warehousing</h4>
                            <p style="color: #666; line-height: 1.8; font-size: 15px; margin: 0;">Secure, organized storage with competitive pricing—whether you need short-term or long-term. Your inventory stays protected and ready for dispatch, so order fulfillment runs smoothly.</p>
                        </div>
                    </div>
                    <!-- Returns Management -->
                    <div class="col-lg-4 col-md-6 mb-40">
                        <div style="background: white; padding: 35px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); height: 100%; border-top: 4px solid #9c27b0;">
                            <h4 style="color: #333; font-size: 22px; font-weight: 700; margin-bottom: 20px;">Returns Management</h4>
                            <p style="color: #666; line-height: 1.8; font-size: 15px; margin: 0;">We manage exchanges transparently and keep you and your buyers informed at every step. A smooth returns process keeps customers happy and your brand reputation strong.</p>
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
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-shipped"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">📋 Order Fulfillment</a></h5>
                                <p>We provide complete services from receiving, processing and delivering orders to clients at their doorsteps.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-support"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">🚚 Last Mile Delivery and COD</a></h5>
                                <p>QuickBox fulfillment center helps you in delivering the products at the doorstep of your clients and provide you a reliable and affordable price with other added features like COD and return shipping.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="single-cat text-center mb-50">
                            <div class="cat-icon">
                                <span class="flaticon-ship"></span>
                            </div>
                            <div class="cat-cap">
                                <h5><a routerLink="/services">📦 Pick and Pack</a></h5>
                                <p>We provide a complete packaging solution, carefully picking finished products, securely packaging them, and delivering them to your specified destination in excellent condition.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Categories Area End -->

        <!-- Order Fulfilment Section Start -->
        <div class="order-fulfilment-area section-padding30" style="background: #f8f9fa;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <!-- Section Tittle -->
                        <div class="section-tittle text-center mb-80">
                            <span>Order Fulfilment</span>
                            <h2>Complete E-Commerce Fulfilment Solutions</h2>
                            <p style="max-width: 800px; margin: 20px auto 0; color: #666; line-height: 1.8;">
                                E-commerce is rapidly shaping the future of business—and Quick Box is your trusted fulfilment partner.
                            </p>
                            <p style="max-width: 800px; margin: 15px auto 0; color: #666; line-height: 1.8;">
                                We help businesses receive, process, and deliver orders seamlessly and on time, reaching every Kenyan doorstep—from Nairobi to Kisumu and beyond. With Quick Box, your customers enjoy a smooth, reliable delivery experience from the moment an order is placed.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- How It Works Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle mb-50">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 30px;">How It Works</h3>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: 100%;">
                                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                        <span class="flaticon-shipped" style="font-size: 30px; color: white;"></span>
                                    </div>
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 15px;">1. Order Placement</h5>
                                    <p style="color: #666; line-height: 1.8; margin: 0;">Orders are placed on your website or sales platform.</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: 100%;">
                                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                        <span class="flaticon-support" style="font-size: 30px; color: white;"></span>
                                    </div>
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 15px;">2. Order Integration</h5>
                                    <p style="color: #666; line-height: 1.8; margin: 0;">Orders are shared with Quick Box via Google Sheets (with a mobile app and fully integrated API system currently near completion).</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: 100%;">
                                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                        <span class="flaticon-clock" style="font-size: 30px; color: white;"></span>
                                    </div>
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 15px;">3. Call Centre Processing</h5>
                                    <p style="color: #666; line-height: 1.8; margin: 0;">Our Call Centre Team processes each order, scheduling deliveries through customer confirmation calls. We make up to 3 call attempts and follow up for 3 consecutive days if a client is unreachable.</p>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: 100%;">
                                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                        <span class="flaticon-ship" style="font-size: 30px; color: white;"></span>
                                    </div>
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 15px;">4. Operations & Dispatch</h5>
                                    <p style="color: #666; line-height: 1.8; margin: 0;">Once scheduled, our Operations Team prepares the parcels for dispatch: Nairobi & express orders are shipped the same day; outbound parcels reach their destination within 24 hours. Professional packing and optional custom branding are available.</p>
                                </div>
                            </div>
                            <div class="col-lg-12 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
                                        <span class="flaticon-place" style="font-size: 30px; color: white;"></span>
                                    </div>
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 15px;">5. Cash on Delivery (COD)</h5>
                                    <p style="color: #666; line-height: 1.8; margin: 0;">For Cash on Delivery (COD) orders, our agents collect payment and remit funds or payment confirmations based on the client's preferred remittance schedule.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Last-Mile Delivery Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div style="background: linear-gradient(135deg, #001f3f 0%, #003d7a 100%); padding: 50px 40px; border-radius: 15px; color: white;">
                            <div class="section-tittle mb-40">
                                <h3 style="color: white; font-size: 32px; font-weight: 700; margin-bottom: 20px;">Last-Mile Delivery</h3>
                                <p style="color: rgba(255,255,255,0.9); line-height: 1.8; font-size: 16px; margin-bottom: 30px;">
                                    Last-mile delivery is one of Quick Box's core strengths. We specialize in delivering parcels accurately, efficiently, and professionally—ensuring excellent buyer experiences while helping businesses close sales successfully. We also manage Cash on Delivery (COD) and returns, which are critical components of e-commerce operations.
                                </p>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-md-6 mb-20">
                                    <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; backdrop-filter: blur(10px);">
                                        <h5 style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Delivery Process</h5>
                                        <ul style="color: rgba(255,255,255,0.9); line-height: 2; padding-left: 20px; margin: 0;">
                                            <li>After order confirmation, parcels are forwarded to the Warehouse Team for picking and packing.</li>
                                            <li>Orders are routed and assigned to a Quick Box rider (within Nairobi) or a Quick Box agent (outside Nairobi).</li>
                                            <li>Parcels are labelled and dispatched to the field.</li>
                                            <li>Upon arrival, the agent delivers to the exact location and confirms payment or collects cash, depending on the selected payment method.</li>
                                            <li>In case of defects or mismatched specifications, we facilitate exchanges while keeping both the client and buyer fully informed at every step.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 mb-20">
                                    <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; backdrop-filter: blur(10px);">
                                        <h5 style="color: white; font-size: 18px; font-weight: 600; margin-bottom: 15px;">Our Commitment</h5>
                                        <p style="color: rgba(255,255,255,0.9); line-height: 1.8; margin: 0;">
                                            Our commitment to reliability builds trust—encouraging repeat purchases and long-term partnerships.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Medical Courier Services Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle mb-50">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 30px;">Medical Courier Services</h3>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); border-left: 5px solid #f15f22;">
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 20px;">
                                        We provide specialized medical courier services for clients requiring urgent or sensitive medical deliveries.
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 mb-20">
                                            <div style="text-align: center;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                                    <span class="flaticon-shipped" style="font-size: 35px; color: white;"></span>
                                                </div>
                                                <h5 style="color: #333; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Dedicated Riders</h5>
                                                <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Dedicated riders are assigned to medical orders</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 mb-20">
                                            <div style="text-align: center;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                                    <span class="flaticon-support" style="font-size: 35px; color: white;"></span>
                                                </div>
                                                <h5 style="color: #333; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Maximum Care</h5>
                                                <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Parcels are handled with maximum care and urgency</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 mb-20">
                                            <div style="text-align: center;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                                    <span class="flaticon-clock" style="font-size: 35px; color: white;"></span>
                                                </div>
                                                <h5 style="color: #333; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Time-Critical</h5>
                                                <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Ideal for medication delivery, medical supplies, and time-critical shipments</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-top: 30px; text-align: center; font-style: italic;">
                                        At Quick Box, client wellbeing is a priority—and we go the extra mile when it matters most.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Warehousing Solutions Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle mb-50">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 30px;">Warehousing Solutions</h3>
                            <p style="color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 30px;">
                                Quick Box offers secure, structured warehousing tailored for e-commerce sellers.
                            </p>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: 100%;">
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 20px;">Warehousing Options</h5>
                                    <ul style="color: #666; line-height: 2; padding-left: 20px; margin: 0;">
                                        <li>Short-term warehousing (less than 3 months)</li>
                                        <li>Long-term warehousing (over 3 months)</li>
                                        <li>Competitive pricing for businesses of all sizes</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-6 mb-30">
                                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08); height: 100%;">
                                    <h5 style="color: #333; font-size: 20px; font-weight: 600; margin-bottom: 20px;">Features</h5>
                                    <ul style="color: #666; line-height: 2; padding-left: 20px; margin: 0;">
                                        <li>Organized pallet and rack storage</li>
                                        <li>Secure and well-managed facilities</li>
                                        <li>Picking and packing services</li>
                                        <li>High-quality packing materials provided</li>
                                        <li>Proper sealing and labelling to ensure product safety</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-30">
                            <div class="col-lg-12">
                                <div style="background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
                                    <p style="color: white; line-height: 1.8; font-size: 16px; margin: 0;">
                                        Our warehousing solutions ensure efficiency, protection, and smooth order fulfilment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- On-Demand Errands Section -->
                <div class="row mb-80">
                    <div class="col-lg-12">
                        <div class="section-tittle mb-50">
                            <h3 style="color: #333; font-size: 32px; font-weight: 700; margin-bottom: 30px;">On-Demand Errands</h3>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div style="background: white; padding: 40px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.08);">
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-bottom: 30px;">
                                        This service is designed for e-commerce clients who require same-day, flexible support.
                                    </p>
                                    <div class="row">
                                        <div class="col-lg-4 col-md-4 mb-20">
                                            <div style="text-align: center; padding: 20px;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f15f22 0%, #ff8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                                    <span class="flaticon-clock" style="font-size: 35px; color: white;"></span>
                                                </div>
                                                <h5 style="color: #333; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Day-Based Allocation</h5>
                                                <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Day-based rider allocation</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 mb-20">
                                            <div style="text-align: center; padding: 20px;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                                    <span class="flaticon-shipped" style="font-size: 35px; color: white;"></span>
                                                </div>
                                                <h5 style="color: #333; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Same-Day Service</h5>
                                                <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Picking, packaging, and delivery handled within the same day</p>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-4 mb-20">
                                            <div style="text-align: center; padding: 20px;">
                                                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                                                    <span class="flaticon-support" style="font-size: 35px; color: white;"></span>
                                                </div>
                                                <h5 style="color: #333; font-size: 18px; font-weight: 600; margin-bottom: 10px;">Flexible Solutions</h5>
                                                <p style="color: #666; line-height: 1.6; margin: 0; font-size: 14px;">Ideal for businesses with multiple errands or dynamic delivery needs</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p style="color: #666; line-height: 1.8; font-size: 16px; margin-top: 30px; text-align: center; font-style: italic;">
                                        We work closely with our clients to fully understand their requirements and deliver tailored solutions—because at Quick Box, your needs come first.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Order Fulfilment Section End -->

    </main>

    <!-- Scroll Up -->
    <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `
})
export class ServicesComponent {}

