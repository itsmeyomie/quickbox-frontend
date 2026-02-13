import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-about',
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
                                <h2>About QuickBox</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">About</a></li> 
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- slider Area End-->
        <!--? About Area Start -->
        <div class="about-low-area section-padding30" style="overflow: hidden;">
            <div class="container">
                <div class="row align-items-center" style="margin: 0 -15px; gap: 0;">
                    <div class="col-lg-6 col-md-12 order-2 order-lg-1" style="padding: 0 15px; margin-bottom: 30px;">
                        <div class="about-caption mb-50" style="padding-right: 0;">
                            <div class="section-tittle mb-35">
                                <span>About QuickBox</span>
                                <h2>Fast Delivery Solutions That Save Your Valuable Time!</h2>
                            </div>

                            <div class="about-focus-div" style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #f15f22;">
                                <h4 style="color: #001f3f; font-size: 22px; font-weight: 700; margin-bottom: 15px;">Mission</h4>
                                <p style="margin: 0; color: #555; line-height: 1.8;">To revolutionize the delivery industry by providing fast, reliable, and innovative shipping solutions. We understand that in today's fast-paced world, every minute counts—and we exist to get your packages where they need to be, when they need to be there.</p>
                            </div>

                            <div class="about-focus-div" style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #003d7a;">
                                <h4 style="color: #001f3f; font-size: 22px; font-weight: 700; margin-bottom: 15px;">Operational Philosophy</h4>
                                <p style="margin: 0; color: #555; line-height: 1.8;">We combine a state-of-the-art logistics network with cutting-edge technology to ensure every package reaches its destination safely and on time. We operate with precision, accountability, and a relentless focus on quality—because excellence in every delivery is non-negotiable.</p>
                            </div>

                            <div class="about-focus-div" style="background: #f8f9fa; padding: 30px; border-radius: 12px; margin-bottom: 30px; border-left: 4px solid #4caf50;">
                                <h4 style="color: #001f3f; font-size: 22px; font-weight: 700; margin-bottom: 15px;">Commitment to Trust & Transparency</h4>
                                <p style="margin: 0; color: #555; line-height: 1.8;">We believe that logistics is built on trust. You trust us with your inventory, your customers' experience, your cash (COD), and your brand. We respond with full transparency—clear processes, real-time tracking, honest communication, and timely remittance. No surprises, no hidden gaps.</p>
                            </div>

                            <a routerLink="/contact" class="btn">Get In Touch</a>
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
    </main>

    <!-- Scroll Up -->
    <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `,
  styles: [`
    .about-low-area .about-caption p { padding-right: 0 !important; }
    .about-low-area .row > div { position: relative !important; }
  `]
})
export class AboutComponent {}

