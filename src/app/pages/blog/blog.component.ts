import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../shared/services/content.service';
import { BlogPost } from '../../shared/models/content.model';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BlogCardComponent],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>{{ translate('blog.title') }}</h1>
        <p>{{ translate('blog.subtitle') }}</p>
      </div>
    </section>

    <section class="section blog-section">
      <div class="container">
        <div class="blog-filters">
          <div class="search-bar">
            <input 
              type="text" 
              [(ngModel)]="searchTerm" 
              (input)="filterBlogs()" 
              placeholder="{{ translate('blog.search') }}"
              class="form-input"
            >
          </div>
          
          <div class="filter-categories">
            <p class="filter-label">{{ translate('blog.categories') }}:</p>
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

        <div class="blog-grid">
          <app-blog-card 
            *ngFor="let blog of filteredBlogs" 
            [blog]="blog"
          ></app-blog-card>
        </div>
        
        <div *ngIf="filteredBlogs.length === 0" class="no-results">
          <p>No blog posts found matching your criteria. Please try a different search.</p>
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
    
    .blog-filters {
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
    
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-6);
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
    
    .no-results {
      text-align: center;
      padding: var(--space-10);
      background-color: var(--background-secondary);
      border-radius: var(--radius-lg);
    }
  `]
})
export class BlogComponent implements OnInit {
  blogs: BlogPost[] = [];
  filteredBlogs: BlogPost[] = [];
  categories: string[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';
  
  constructor(
    private contentService: ContentService,
    private languageService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.contentService.getBlogs().subscribe(blogs => {
      this.blogs = blogs;
      this.filteredBlogs = blogs;
      
      // Extract unique categories
      const uniqueCategories = new Set<string>();
      blogs.forEach(blog => {
        uniqueCategories.add(blog.category);
      });
      this.categories = Array.from(uniqueCategories);
    });
  }
  
  filterBlogs(): void {
    this.filteredBlogs = this.blogs.filter(blog => {
      const matchesSearch = this.searchTerm === '' || 
        blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.titleHi.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.summary.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.summaryHi.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.contentHi.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || 
        blog.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }
  
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterBlogs();
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
      'Services': 'सेवाएं',
      'Digital': 'डिजिटल',
      'Travel': 'यात्रा'
    };
    
    return categoryTranslations[category] || category;
  }
}