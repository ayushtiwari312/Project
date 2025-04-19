import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/content.model';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="blog-card card">
      <div class="blog-image">
        <img [src]="blog.image" [alt]="getCurrentLanguage() === 'en' ? blog.title : blog.titleHi">
      </div>
      <div class="blog-content">
        <div class="blog-meta">
          <span class="blog-date">{{ formatDate(blog.date) }}</span>
          <span class="blog-category">{{ getCurrentLanguage() === 'en' ? blog.category : blog.categoryHi }}</span>
        </div>
        <h3>{{ getCurrentLanguage() === 'en' ? blog.title : blog.titleHi }}</h3>
        <p>{{ getCurrentLanguage() === 'en' ? blog.summary : blog.summaryHi }}</p>
        <div class="blog-footer">
          <a [routerLink]="['/blog', blog.id]" class="blog-link">
            {{ translate('blog.readMore') }}
          </a>
          <div class="blog-author">
            {{ getCurrentLanguage() === 'en' ? blog.author : blog.authorHi }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
    
    .blog-image {
      height: 200px;
      overflow: hidden;
      margin: calc(var(--space-6) * -1) calc(var(--space-6) * -1) 0;
    }
    
    .blog-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal) var(--ease-out);
    }
    
    .blog-card:hover .blog-image img {
      transform: scale(1.05);
    }
    
    .blog-content {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-top: var(--space-4);
    }
    
    .blog-meta {
      display: flex;
      gap: var(--space-3);
      margin-bottom: var(--space-2);
      font-size: var(--text-sm);
    }
    
    .blog-date {
      color: var(--text-tertiary);
    }
    
    .blog-category {
      color: var(--primary-600);
      font-weight: 500;
    }
    
    .blog-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: var(--space-4);
    }
    
    .blog-link {
      font-weight: 500;
      color: var(--primary-600);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      transition: color var(--transition-fast) var(--ease-out);
    }
    
    .blog-link:hover {
      color: var(--primary-800);
      text-decoration: none;
    }
    
    .blog-link:after {
      content: '→';
      margin-left: var(--space-2);
      transition: transform var(--transition-fast) var(--ease-out);
    }
    
    .blog-link:hover:after {
      transform: translateX(4px);
    }
    
    .blog-author {
      font-size: var(--text-sm);
      color: var(--text-tertiary);
    }
  `]
})
export class BlogCardComponent {
  @Input() blog!: BlogPost;
  
  constructor(private languageService: LanguageService) {}
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      this.languageService.getCurrentLanguage() === 'en' ? 'en-US' : 'hi-IN', 
      { year: 'numeric', month: 'long', day: 'numeric' }
    ).format(date);
  }
  
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
}