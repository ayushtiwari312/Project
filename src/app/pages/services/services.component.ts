import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../shared/services/content.service';
import { ServiceItem } from '../../shared/models/content.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>{{ translate('services.title') }}</h1>
        <p>{{ translate('services.subtitle') }}</p>
      </div>
    </section>

    <section class="section services-section">
      <div class="container">
        <div class="services-filters">
          <div class="search-bar">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterServices()" 
              placeholder="{{ translate('services.search') }}"
              class="form-input"
            >
          </div>
          
          <div class="filter-categories">
            <p class="filter-label">{{ translate('services.categories') }}:</p>
            <div class="category-filters">
              <button 
                class="category-btn" 
                [ngClass]="{'active': selectedCategory === 'all'}" 
                (click)="selectCategory('all')"
              >
                All
              </button>
              <button 
                *ngFor="let category of categories" 
                class="category-btn" 
                [ngClass]="{'active': selectedCategory === category}" 
                (click)="selectCategory(category)"
              >
                {{ getCurrentLanguage() === 'en' ? category : getCategoryTranslation(category) }}
              </button>
            </div>
          </div>
        </div>

        <div class="services-grid">
          <div *ngFor="let service of filteredServices" class="service-item" [id]="'service-' + service.id">
            <div class="service-card card">
              <div class="service-image">
                <img [src]="service.image" [alt]="getCurrentLanguage() === 'en' ? service.title : service.titleHi">
              </div>
              <div class="service-content">
                <h3>{{ getCurrentLanguage() === 'en' ? service.title : service.titleHi }}</h3>
                <p>{{ getCurrentLanguage() === 'en' ? service.description : service.descriptionHi }}</p>
                <div class="service-category">
                  {{ getCurrentLanguage() === 'en' ? service.category : service.categoryHi }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div *ngIf="filteredServices.length === 0" class="no-results">
          <p>No services found matching your criteria. Please try a different search.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background-color: var(--primary-900);
      color: white;
      padding: var(--space-20) 0 var(--space-12);
      text-align: center;
    }
    
    .page-header h1 {
      font-size: var(--text-4xl);
      margin-bottom: var(--space-4);
    }
    
    .page-header p {
      font-size: var(--text-xl);
      max-width: 700px;
      margin: 0 auto;
    }
    
    .services-filters {
      margin-bottom: var(--space-8);
    }
    
    .search-bar {
      margin-bottom: var(--space-6);
    }
    
    .filter-label {
      font-weight: 500;
      margin-bottom: var(--space-2);
    }
    
    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .category-btn {
      padding: var(--space-2) var(--space-4);
      border-radius: var(--radius-md);
      background-color: var(--background-tertiary);
      border: none;
      cursor: pointer;
      font-size: var(--text-sm);
      transition: background-color var(--transition-fast) var(--ease-out),
                  color var(--transition-fast) var(--ease-out);
    }
    
    .category-btn.active {
      background-color: var(--primary-600);
      color: white;
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-6);
    }
    
    @media (min-width: 640px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .services-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .service-item {
      animation: fadeIn var(--transition-normal) var(--ease-out);
    }
    
    .service-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
    
    .service-image {
      height: 200px;
      overflow: hidden;
      margin: calc(var(--space-6) * -1) calc(var(--space-6) * -1) 0;
    }
    
    .service-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal) var(--ease-out);
    }
    
    .service-card:hover .service-image img {
      transform: scale(1.05);
    }
    
    .service-content {
      padding-top: var(--space-4);
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .service-content h3 {
      margin-bottom: var(--space-2);
    }
    
    .service-content p {
      margin-bottom: var(--space-4);
      flex: 1;
    }
    
    .service-category {
      display: inline-block;
      padding: var(--space-1) var(--space-3);
      background-color: var(--primary-100);
      color: var(--primary-800);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 500;
      align-self: flex-start;
    }
    
    .no-results {
      text-align: center;
      padding: var(--space-10);
      background-color: var(--background-secondary);
      border-radius: var(--radius-lg);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ServicesComponent implements OnInit {
  services: ServiceItem[] = [];
  filteredServices: ServiceItem[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  
  constructor(
    private route: ActivatedRoute,
    private contentService: ContentService,
    private languageService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.contentService.getServices().subscribe(services => {
      this.services = services;
      this.filteredServices = services;
      
      // Extract unique categories
      const uniqueCategories = new Set<string>();
      services.forEach(service => {
        uniqueCategories.add(service.category);
      });
      this.categories = Array.from(uniqueCategories);
      
      // Check for query params
      this.route.queryParams.subscribe(params => {
        if (params['service']) {
          const serviceId = parseInt(params['service'], 10);
          setTimeout(() => {
            this.scrollToService(serviceId);
          }, 100);
        }
      });
    });
  }
  
  filterServices(): void {
    this.filteredServices = this.services.filter(service => {
      const matchesSearch = this.searchTerm === '' || 
        service.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.titleHi.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        service.descriptionHi.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || 
        service.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }
  
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterServices();
  }
  
  scrollToService(serviceId: number): void {
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add a highlight animation or class
      element.classList.add('pulse');
      setTimeout(() => {
        element.classList.remove('pulse');
      }, 2000);
    }
  }
  
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
  
  getCategoryTranslation(category: string): string {
    // Convert English category to Hindi
    const categoryTranslations: Record<string, string> = {
      'Identity': 'पहचान',
      'Travel': 'यात्रा',
      'Digital': 'डिजिटल',
      'Finance': 'वित्त',
      'Payments': 'भुगतान'
    };
    
    return categoryTranslations[category] || category;
  }
}