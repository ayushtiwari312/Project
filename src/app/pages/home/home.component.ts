import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';
import { ContentService } from '../../shared/services/content.service';
import { ServiceItem, BlogPost, Testimonial } from '../../shared/models/content.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    ServiceCardComponent, 
    BlogCardComponent, 
    TestimonialCardComponent
  ],
  template: `
    <section class="hero">
      <div class="container">
        <div class="hero-content slide-up">
          <h1>{{ translate('home.hero.title') }}</h1>
          <p>{{ translate('home.hero.subtitle') }}</p>
          <a routerLink="/services" class="btn btn-primary">{{ translate('home.hero.cta') }}</a>
        </div>
      </div>
    </section>

    <section class="section services-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>{{ translate('home.services.title') }}</h2>
        </div>
        <div class="services-grid">
          <app-service-card 
            *ngFor="let service of featuredServices" 
            [service]="service"
          ></app-service-card>
        </div>
        <div class="text-center mt-6">
          <a routerLink="/services" class="btn btn-outline">{{ translate('home.services.viewAll') }}</a>
        </div>
      </div>
    </section>

    <section class="section about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-image">
            <img src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="About Sudhir Jan Seva Kendra">
          </div>
          <div class="about-text">
            <h2>{{ translate('home.about.title') }}</h2>
            <p>{{ translate('home.about.description') }}</p>
            <a routerLink="/about" class="btn btn-primary">{{ translate('home.about.readMore') }}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>{{ translate('home.testimonials.title') }}</h2>
        </div>
        <div class="testimonials-grid">
          <app-testimonial-card 
            *ngFor="let testimonial of testimonials" 
            [testimonial]="testimonial"
          ></app-testimonial-card>
        </div>
      </div>
    </section>

    <section class="section blog-section">
      <div class="container">
        <div class="section-header text-center">
          <h2>{{ translate('home.blog.title') }}</h2>
        </div>
        <div class="blog-grid">
          <app-blog-card 
            *ngFor="let blog of latestBlogs" 
            [blog]="blog"
          ></app-blog-card>
        </div>
        <div class="text-center mt-6">
          <a routerLink="/blog" class="btn btn-outline">{{ translate('home.blog.viewAll') }}</a>
        </div>
      </div>
    </section>

    <section class="section contact-cta">
      <div class="container">
        <div class="cta-content text-center">
          <h2>{{ translate('home.contact.title') }}</h2>
          <p>We're here to help with all your service needs. Reach out to us for assistance!</p>
          <a routerLink="/contact" class="btn btn-primary">{{ translate('home.contact.cta') }}</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 600px;
      background-image: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      background-size: cover;
      background-position: center;
      color: white;
      display: flex;
      align-items: center;
      position: relative;
    }
    
    .hero-content {
      max-width: 600px;
    }
    
    .hero-content h1 {
      font-size: var(--text-4xl);
      font-weight: 700;
      margin-bottom: var(--space-4);
      line-height: 1.2;
    }
    
    .hero-content p {
      font-size: var(--text-xl);
      margin-bottom: var(--space-6);
      line-height: var(--leading-relaxed);
    }
    
    .section-header {
      margin-bottom: var(--space-10);
    }
    
    .section-header h2 {
      position: relative;
      display: inline-block;
      padding-bottom: var(--space-3);
    }
    
    .section-header h2:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background-color: var(--primary-600);
      border-radius: var(--radius-full);
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }
    
    @media (min-width: 640px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .services-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .about-section {
      background-color: var(--background-secondary);
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
    
    @media (min-width: 768px) {
      .about-content {
        grid-template-columns: 1fr 1fr;
        align-items: center;
      }
    }
    
    .about-image {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    
    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .about-text h2 {
      margin-bottom: var(--space-4);
    }
    
    .about-text p {
      margin-bottom: var(--space-6);
      line-height: var(--leading-relaxed);
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
    
    @media (min-width: 768px) {
      .testimonials-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .blog-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }
    
    @media (min-width: 640px) {
      .blog-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .blog-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .contact-cta {
      background-color: var(--primary-900);
      color: white;
    }
    
    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .cta-content h2 {
      color: white;
    }
    
    .cta-content p {
      margin-bottom: var(--space-6);
    }
    
    .mt-6 {
      margin-top: var(--space-6);
    }
  `]
})
export class HomeComponent implements OnInit {
  featuredServices: ServiceItem[] = [];
  latestBlogs: BlogPost[] = [];
  testimonials: Testimonial[] = [];
  
  constructor(
    private contentService: ContentService,
    private languageService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.contentService.getServices().subscribe(services => {
      this.featuredServices = services.slice(0, 4);
    });
    
    this.contentService.getBlogs().subscribe(blogs => {
      this.latestBlogs = blogs.slice(0, 3);
    });
    
    this.contentService.getTestimonials().subscribe(testimonials => {
      this.testimonials = testimonials;
    });
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
}