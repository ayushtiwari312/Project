import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServiceItem } from '../../models/content.model';
import { LanguageService } from '../../../core/services/language.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="service-card card">
      <div class="service-icon" [innerHTML]="getSanitizedIcon()"></div>
      <h3>{{ getCurrentLanguage() === 'en' ? service.title : service.titleHi }}</h3>
      <p>{{ getCurrentLanguage() === 'en' ? service.description : service.descriptionHi }}</p>
      <a routerLink="/services" [queryParams]="{service: service.id}" class="service-link">
        {{ translate('common.readMore') }}
      </a>
    </div>
  `,
  styles: [`
    .service-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform var(--transition-normal) var(--ease-out),
                  box-shadow var(--transition-normal) var(--ease-out);
    }
    
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .service-icon {
      font-size: 2rem;
      margin-bottom: var(--space-4);
      color: var(--primary-600);
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--primary-100);
      border-radius: var(--radius-full);
    }
    
    .service-link {
      margin-top: auto;
      padding-top: var(--space-4);
      font-weight: 500;
      color: var(--primary-600);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: color var(--transition-fast) var(--ease-out);
    }
    
    .service-link:hover {
      color: var(--primary-800);
      text-decoration: none;
    }
    
    .service-link:after {
      content: '→';
      margin-left: var(--space-2);
      transition: transform var(--transition-fast) var(--ease-out);
    }
    
    .service-link:hover:after {
      transform: translateX(4px);
    }
  `]
})
export class ServiceCardComponent {
  @Input() service!: ServiceItem;
  
  constructor(private languageService: LanguageService, private sanitizer: DomSanitizer) {}
  
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
  getSanitizedIcon(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.service.icon);
  }
}