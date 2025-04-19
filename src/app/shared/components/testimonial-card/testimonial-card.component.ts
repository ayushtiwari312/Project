import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Testimonial } from '../../models/content.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="testimonial-card">
      <div class="testimonial-content">
        <div class="quote-icon">"</div>
        <p>{{ getCurrentLanguage() === 'en' ? testimonial.comment : testimonial.commentHi }}</p>
        <div class="rating">
          <span *ngFor="let star of stars">★</span>
        </div>
      </div>
      <div class="testimonial-footer">
        <div class="testimonial-image">
          <img [src]="testimonial.image" [alt]="getCurrentLanguage() === 'en' ? testimonial.name : testimonial.nameHi">
        </div>
        <div class="testimonial-info">
          <h4>{{ getCurrentLanguage() === 'en' ? testimonial.name : testimonial.nameHi }}</h4>
          <p>{{ getCurrentLanguage() === 'en' ? testimonial.role : testimonial.roleHi }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .testimonial-card {
      background-color: var(--background-secondary);
      border-radius: var(--radius-lg);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal) var(--ease-out),
                  box-shadow var(--transition-normal) var(--ease-out);
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .testimonial-content {
      position: relative;
      margin-bottom: var(--space-4);
    }
    
    .quote-icon {
      position: absolute;
      top: -20px;
      left: -10px;
      font-size: 4rem;
      color: var(--primary-200);
      z-index: 0;
      font-family: serif;
      line-height: 1;
      opacity: 0.5;
    }
    
    .testimonial-content p {
      position: relative;
      z-index: 1;
      font-style: italic;
    }
    
    .rating {
      margin-top: var(--space-3);
      color: var(--secondary-500);
      font-size: var(--text-lg);
    }
    
    .testimonial-footer {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .testimonial-image {
      width: 50px;
      height: 50px;
      border-radius: var(--radius-full);
      overflow: hidden;
      border: 2px solid var(--primary-500);
    }
    
    .testimonial-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .testimonial-info h4 {
      margin: 0;
      font-size: var(--text-base);
      color: var(--text-primary);
    }
    
    .testimonial-info p {
      margin: 0;
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }
  `]
})
export class TestimonialCardComponent {
  @Input() testimonial!: Testimonial;
  stars: number[] = [];
  
  constructor(private languageService: LanguageService) {}
  
  ngOnInit() {
    this.stars = Array(this.testimonial.rating).fill(0);
  }
  
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
}