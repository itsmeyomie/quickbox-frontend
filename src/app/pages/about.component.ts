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
            <div class="single-slider hero-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="hero-cap">
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
        <div class="about-low-area section-padding30">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <div class="about-caption mb-50">
                            <!-- Section Tittle -->
                            <div class="section-tittle mb-35">
                                <span>About QuickBox</span>
                                <h2>Fast Delivery Solutions That Save Your Valuable Time!</h2>
                            </div>
                            <p>QuickBox was founded with a simple mission: to revolutionize the delivery industry by providing fast, reliable, and innovative shipping solutions. We understand that in today's fast-paced world, every minute counts.</p>
                            <p>Our state-of-the-art logistics network, combined with cutting-edge technology, ensures your packages reach their destination safely and on time, every time. We're committed to excellence in every delivery.</p>
                            <a routerLink="/contact" class="btn">Get In Touch</a>
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
    </main>

    <!-- Scroll Up -->
    <div id="back-top" >
        <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
    </div>
      `
})
export class AboutComponent {
  onImageError(event: any, imageName: string): void {
    console.error(`Failed to load image: ${imageName}.jpg`);
    // Try alternative paths
    if (imageName === 'about1') {
      event.target.src = '/assets/img/gallery/about1.JPG';
    } else if (imageName === 'about2') {
      event.target.src = '/assets/img/gallery/about2.JPG';
    }
  }
}

