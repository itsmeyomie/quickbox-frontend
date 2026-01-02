import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-blog',
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
                                <h2>QuickBox Blog</h2>
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                                        <li class="breadcrumb-item"><a href="#">Blog</a></li> 
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
        <section class="blog_area section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mb-5 mb-lg-0">
                        <div class="blog_left_sidebar">
                            <article class="blog_item">
                                <div class="blog_item_img">
                                    <img class="card-img rounded-0" src="/assets/img/blog/single_blog_1.png" alt="Blog Post">
                                    <a href="#" class="blog_item_date">
                                        <h3>15</h3>
                                        <p>Dec</p>
                                    </a>
                                </div>
                                <div class="blog_details">
                                    <a class="d-inline-block" routerLink="/blog/details">
                                        <h2>5 Tips for Faster Package Delivery</h2>
                                    </a>
                                    <p>Learn how to optimize your shipping process and get your packages delivered faster with these expert tips from QuickBox.</p>
                                    <ul class="blog-info-link">
                                        <li><a href="#"><i class="fa fa-user"></i> Delivery, Tips</a></li>
                                        <li><a href="#"><i class="fa fa-comments"></i> 8 Comments</a></li>
                                    </ul>
                                </div>
                            </article>

                            <article class="blog_item">
                                <div class="blog_item_img">
                                    <img class="card-img rounded-0" src="/assets/img/blog/single_blog_2.png" alt="Blog Post">
                                    <a href="#" class="blog_item_date">
                                        <h3>12</h3>
                                        <p>Dec</p>
                                    </a>
                                </div>
                                <div class="blog_details">
                                    <a class="d-inline-block" routerLink="/blog/details">
                                        <h2>How to Choose the Right Packaging</h2>
                                    </a>
                                    <p>Discover the best packaging solutions for your products to ensure safe delivery and customer satisfaction.</p>
                                    <ul class="blog-info-link">
                                        <li><a href="#"><i class="fa fa-user"></i> Packaging, Guide</a></li>
                                        <li><a href="#"><i class="fa fa-comments"></i> 15 Comments</a></li>
                                    </ul>
                                </div>
                            </article>

                            <article class="blog_item">
                                <div class="blog_item_img">
                                    <img class="card-img rounded-0" src="/assets/img/blog/single_blog_3.png" alt="Blog Post">
                                    <a href="#" class="blog_item_date">
                                        <h3>08</h3>
                                        <p>Dec</p>
                                    </a>
                                </div>
                                <div class="blog_details">
                                    <a class="d-inline-block" routerLink="/blog/details">
                                        <h2>International Shipping Made Easy</h2>
                                    </a>
                                    <p>Everything you need to know about shipping internationally with QuickBox, from customs to delivery times.</p>
                                    <ul class="blog-info-link">
                                        <li><a href="#"><i class="fa fa-user"></i> International, Shipping</a></li>
                                        <li><a href="#"><i class="fa fa-comments"></i> 22 Comments</a></li>
                                    </ul>
                                </div>
                            </article>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget search_widget">
                                <form action="#">
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder='Search Keyword' onfocus="this.placeholder = ''" onblur="this.placeholder = 'Search Keyword'">
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
                                    <li>
                                        <a href="#" class="d-flex">
                                            <p>News</p>
                                            <p>(10)</p>
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
export class BlogComponent {}

