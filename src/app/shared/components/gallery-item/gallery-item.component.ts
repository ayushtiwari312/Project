import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryItem } from '../../models/content.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-gallery-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gallery-item" (click)="onImageClick()">
      <div class="gallery-image">
        <img [src]="item.image" [alt]="getCurrentLanguage() === 'en' ? item.title : item.titleHi">
      </div>
      <div class="gallery-overlay">
        <h3>{{ getCurrentLanguage() === 'en' ? item.title : item.titleHi }}</h3>
        <p>{{ getCurrentLanguage() === 'en' ? item.description : item.descriptionHi }}</p>
        <span class="gallery-category">{{ getCurrentLanguage() === 'en' ? item.category : item.categoryHi }}</span>
      </div>
    </div>
  `,
  styles: [`
    .gallery-item {
      position: relative;
      overflow: hidden;
      border-radius: var(--radius-lg);
      cursor: pointer;
      height: 250px;
    }
    
    .gallery-image {
      width: 100%;
      height: 100%;
    }
    
    .gallery-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal) var(--ease-out);
    }
    
    .gallery-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      color: white;
      padding: var(--space-4);
      transform: translateY(100%);
      transition: transform var(--transition-normal) var(--ease-out);
    }
    
    .gallery-item:hover .gallery-image img {
      transform: scale(1.05);
    }
    
    .gallery-item:hover .gallery-overlay {
      transform: translateY(0);
    }
    
    .gallery-overlay h3 {
      margin-bottom: var(--space-2);
      font-size: var(--text-lg);
    }
    
    .gallery-overlay p {
      font-size: var(--text-sm);
      margin-bottom: var(--space-2);
    }
    
    .gallery-category {
      display: inline-block;
      background-color: var(--primary-600);
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 500;
    }
  `]
})
export class GalleryItemComponent {
  @Input() item!: GalleryItem;
  @Output() imageClicked = new EventEmitter<GalleryItem>();
  
  constructor(private languageService: LanguageService) {}
  
  onImageClick() {
    this.imageClicked.emit(this.item);
  }
  
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
}