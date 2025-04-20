import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <footer>
      <div class="container">
        <div class="footer-top">
          <div class="footer-info">
            <h2>Sarthak Digital Seva</h2>
            <p>
              {{translate('footer.rights')}} &copy; {{ currentYear }} Sarthak Digital Seva
            </p>
          </div>
          
          <div class="footer-links">
            <h3>{{translate('footer.quickLinks')}}</h3>
            <ul>
              <li><a routerLink="/">{{translate('nav.home')}}</a></li>
              <li><a routerLink="/about">{{translate('nav.about')}}</a></li>
              <li><a routerLink="/services">{{translate('nav.services')}}</a></li>
              <li><a routerLink="/contact">{{translate('nav.contact')}}</a></li>
              <li><a routerLink="/blog">{{translate('nav.blog')}}</a></li>
              <li><a routerLink="/gallery">{{translate('nav.gallery')}}</a></li>
            </ul>
          </div>
          
          <div class="footer-subscribe">
            <h3>{{translate('footer.subscribe.title')}}</h3>
            <div class="subscribe-form">
              <input 
                type="email" 
                [(ngModel)]="email" 
                placeholder="{{translate('footer.subscribe.placeholder')}}"
              >
              <button (click)="subscribe()" class="btn btn-primary">
                {{translate('footer.subscribe.button')}}
              </button>
            </div>
          </div>
          
          <div class="footer-social">
            <h3>{{translate('footer.followUs')}}</h3>
            <div class="social-icons">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">F</a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">T</a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">I</a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">L</a>
            </div>
          </div>
        </div>
      </div>
      
      <button class="back-to-top" [ngClass]="{'visible': showBackToTop}" (click)="scrollToTop()">
        {{translate('common.backToTop')}}
      </button>
    </footer>
  `,
  styles: [`
    footer {
      background-color: var(--background-secondary);
      color: var(--text-primary);
      padding: var(--space-12) 0 var(--space-8);
      position: relative;
    }
    
    .footer-top {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
    
    @media (min-width: 640px) {
      .footer-top {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .footer-top {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .footer-info h2 {
      font-size: var(--text-xl);
      margin-bottom: var(--space-4);
      color: var(--primary-700);
    }
    
    .footer-info p {
      font-size: var(--text-sm);
      line-height: var(--leading-relaxed);
    }
    
    .footer-links h3,
    .footer-subscribe h3,
    .footer-social h3 {
      font-size: var(--text-lg);
      margin-bottom: var(--space-4);
    }
    
    .footer-links ul {
      list-style: none;
      padding: 0;
    }
    
    .footer-links li {
      margin-bottom: var(--space-2);
    }
    
    .footer-links a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color var(--transition-fast) var(--ease-out);
    }
    
    .footer-links a:hover {
      color: var(--primary-600);
      text-decoration: none;
    }
    
    .subscribe-form {
      display: flex;
      margin-top: var(--space-2);
    }
    
    .subscribe-form input {
      flex: 1;
      padding: var(--space-2) var(--space-3);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md) 0 0 var(--radius-md);
      background-color: var(--background-primary);
      color: var(--text-primary);
    }
    
    .subscribe-form button {
      border-radius: 0 var(--radius-md) var(--radius-md) 0;
    }
    
    .social-icons {
      display: flex;
      gap: var(--space-3);
      margin-top: var(--space-2);
    }
    
    .social-icons a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      background-color: var(--primary-600);
      color: white;
      text-decoration: none;
      transition: background-color var(--transition-fast) var(--ease-out),
                  transform var(--transition-fast) var(--ease-out);
    }
    
    .social-icons a:hover {
      background-color: var(--primary-700);
      transform: translateY(-3px);
    }
    
    .back-to-top {
      position: fixed;
      bottom: var(--space-6);
      right: var(--space-6);
      padding: var(--space-3) var(--space-4);
      background-color: var(--primary-600);
      color: white;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: opacity var(--transition-normal) var(--ease-out),
                  visibility var(--transition-normal) var(--ease-out);
      z-index: var(--z-30);
    }
    
    .back-to-top.visible {
      opacity: 1;
      visibility: visible;
    }
    
    .back-to-top:hover {
      background-color: var(--primary-700);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email = '';
  showBackToTop = false;

  constructor(private languageService: LanguageService) {
    window.addEventListener('scroll', () => {
      this.showBackToTop = window.scrollY > 300;
    });
  }

  subscribe(): void {
    if (this.email && this.validateEmail(this.email)) {
      // In a real app, this would connect to a newsletter service
      console.log('Subscribed with:', this.email);
      alert('Thank you for subscribing!');
      this.email = '';
    } else {
      alert('Please enter a valid email address');
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}