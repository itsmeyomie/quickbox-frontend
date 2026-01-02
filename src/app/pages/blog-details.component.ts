import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-blog-details',
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
                             <h2>Blog Details</h2>
                             <nav aria-label="breadcrumb">
                                 <ol class="breadcrumb">
                                     <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                     <li class="breadcrumb-item"><a routerLink="/blog">Blog</a></li>
                                     <li class="breadcrumb-item"><a href="#">Blog Details</a></li> 
                                 </ol>
                             </nav>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     <!-- slider Area End-->
      <!--================Blog Area =================-->
      <section class="blog_area single-post-area section-padding">
         <div class="container">
            <div class="row">
               <div class="col-lg-8 posts-list">
                  <div class="single-post">
                     <div class="feature-img">
                        <img class="img-fluid" src="/assets/img/blog/single_blog_1.png" alt="Blog Post">
                     </div>
                     <div class="blog_details">
                        <h2>5 Tips for Faster Package Delivery with QuickBox</h2>
                        <ul class="blog-info-link mt-3 mb-4">
                           <li><a href="#"><i class="fa fa-user"></i> Delivery, Tips</a></li>
                           <li><a href="#"><i class="fa fa-comments"></i> 8 Comments</a></li>
                        </ul>
                        <p class="excert">
                           Getting your packages delivered quickly and safely is essential in today's fast-paced world. At QuickBox, we've compiled our top tips to help you optimize your shipping process and ensure timely deliveries.
                        </p>
                        <p>
                           Whether you're shipping personal items or running an e-commerce business, these proven strategies will help you get the most out of our delivery services. From proper packaging to choosing the right service level, every detail matters.
                        </p>
                        <div class="quote-wrapper">
                           <div class="quotes">
                              "QuickBox has transformed how we handle our deliveries. Their express service is incredibly fast and reliable. We've never had a package delayed, and their customer service is outstanding."
                           </div>
                        </div>
                        <p>
                           By following these tips and leveraging QuickBox's comprehensive delivery solutions, you can ensure your packages arrive on time, every time. Our team is always here to help you find the best shipping solution for your needs.
                        </p>
                     </div>
                  </div>
               </div>
               <div class="col-lg-4">
                  <div class="blog_right_sidebar">
                     <aside class="single_sidebar_widget search_widget">
                        <form action="#">
                           <div class="form-group">
                              <div class="input-group mb-3">
                                 <input type="text" class="form-control" placeholder='Search Keyword'>
                                 <div class="input-group-append">
                                    <button class="btn" type="button"><i class="ti-search"></i></button>
                                 </div>
                              </div>
                           </div>
                        </form>
                     </aside>
                     <aside class="single_sidebar_widget post_category_widget">
                        <h4 class="widget_title">Category</h4>
                        <ul class="list cat-list">
                           <li>
                              <a href="#" class="d-flex">
                                 <p>Delivery Tips</p>
                                 <p>(12)</p>
                              </a>
                           </li>
                           <li>
                              <a href="#" class="d-flex">
                                 <p>Packaging</p>
                                 <p>(8)</p>
                              </a>
                           </li>
                           <li>
                              <a href="#" class="d-flex">
                                 <p>International</p>
                                 <p>(15)</p>
                              </a>
                           </li>
                        </ul>
                     </aside>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <!--================Blog Area =================-->
   </main>

   <!-- Scroll Up -->
   <div id="back-top" >
      <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
   </div>
      `
})
export class BlogDetailsComponent {}

