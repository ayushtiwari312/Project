import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService } from '../../shared/services/content.service';
import { GalleryItem } from '../../shared/models/content.model';
import { GalleryItemComponent } from '../../shared/components/gallery-item/gallery-item.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, GalleryItemComponent],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>{{ translate('gallery.title') }}</h1>
        <p>{{ translate('gallery.subtitle') }}</p>
      </div>
    </section>

    <section class="section gallery-section">
      <div class="container">
        <div class="gallery-filters">
          <div class="filter-categories">
            <p class="filter-label">{{ translate('gallery.categories') }}:</p>
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

        <div class="gallery-grid">
          <app-gallery-item 
            *ngFor="let item of filteredGalleryItems" 
            [item]="item"
            (imageClicked)="openLightbox(item)"
          ></app-gallery-item>
        </div>
      </div>
    </section>
    
    <!-- Lightbox -->
    <div class="lightbox" *ngIf="lightboxOpen" (click)="closeLightbox()">
      <div class="lightbox-content" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closeLightbox()">×</button>
        <img [src]="currentLightboxItem?.image" [alt]="getCurrentLanguage() === 'en' ? currentLightboxItem?.title : currentLightboxItem?.titleHi">
        <div class="lightbox-caption">
          <h3>{{ getCurrentLanguage() === 'en' ? currentLightboxItem?.title : currentLightboxItem?.titleHi }}</h3>
          <p>{{ getCurrentLanguage() === 'en' ? currentLightboxItem?.description : currentLightboxItem?.descriptionHi }}</p>
        </div>
      </div>
    </div>
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
    
    .gallery-filters {
      margin-bottom: var(--space-8);
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
    
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-6);
    }
    
    @media (min-width: 640px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .gallery-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: var(--z-50);
      animation: fadeIn var(--transition-normal) var(--ease-out);
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
    }
    
    .lightbox-content img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: var(--radius-lg);
    }
    
    .close-btn {
      position: absolute;
      top: -40px;
      right: 0;
      background: none;
      border: none;
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }
    
    .lightbox-caption {
      background-color: rgba(0, 0, 0, 0.7);
      padding: var(--space-4);
      color: white;
      margin-top: var(--space-2);
      border-radius: var(--radius-md);
    }
    
    .lightbox-caption h3 {
      margin-bottom: var(--space-2);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class GalleryComponent implements OnInit {
  galleryItems: GalleryItem[] = [];
  filteredGalleryItems: GalleryItem[] = [];
  categories: string[] = [];
  selectedCategory: string = 'all';
  
  // Lightbox
  lightboxOpen = false;
  currentLightboxItem: GalleryItem | null = null;
  
  constructor(
    private contentService: ContentService,
    private languageService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.contentService.getGalleryItems().subscribe(items => {
      this.galleryItems = items;
      this.filteredGalleryItems = items;
      
      // Extract unique categories
      const uniqueCategories = new Set<string>();
      items.forEach(item => {
        uniqueCategories.add(item.category);
      });
      this.categories = Array.from(uniqueCategories);
    });
  }
  
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterGallery();
  }
  
  filterGallery(): void {
    this.filteredGalleryItems = this.galleryItems.filter(item => {
      return this.selectedCategory === 'all' || item.category === this.selectedCategory;
    });
  }
  
  openLightbox(item: GalleryItem): void {
    this.currentLightboxItem = item;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox(): void {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
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
      'Events': 'कार्यक्रम',
      'Workshops': 'कार्यशालाएं',
      'Community': 'समुदाय',
      'Operations': 'संचालन',
      'Recognition': 'मान्यता',
      'Facilities': 'सुविधाएं'
    };
    
    return categoryTranslations[category] || category;
  }
}