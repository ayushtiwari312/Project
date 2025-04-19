import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContentService } from '../../shared/services/content.service';
import { BlogPost } from '../../shared/models/content.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="blog-detail-section" *ngIf="blog">
      <div class="blog-header">
        <div class="container">
          <h1>{{ getCurrentLanguage() === 'en' ? blog.title : blog.titleHi }}</h1>
          <div class="blog-meta">
            <span class="blog-author">{{ getCurrentLanguage() === 'en' ? blog.author : blog.authorHi }}</span>
            <span class="blog-date">{{ formatDate(blog.date) }}</span>
            <span class="blog-category">{{ getCurrentLanguage() === 'en' ? blog.category : blog.categoryHi }}</span>
          </div>
        </div>
      </div>
      
      <div class="container">
        <div class="blog-detail-container">
          <div class="blog-featured-image">
            <img [src]="blog.image" [alt]="getCurrentLanguage() === 'en' ? blog.title : blog.titleHi">
          </div>
          
          <div class="blog-content">
            <p class="blog-summary">{{ getCurrentLanguage() === 'en' ? blog.summary : blog.summaryHi }}</p>
            <div class="blog-main-content">
              <p>{{ getCurrentLanguage() === 'en' ? blog.content : blog.contentHi }}</p>
            </div>
            
            <div class="blog-tags">
              <span class="tag-label">Tags:</span>
              <div class="tags-list">
                <span 
                  class="tag" 
                  *ngFor="let tag of getCurrentLanguage() === 'en' ? blog.tags : blog.tagsHi"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="blog-navigation">
            <a routerLink="/blog" class="btn btn-outline">← {{ translate('common.backToTop') }}</a>
          </div>
        </div>
      </div>
    </section>
    
    <section class="not-found" *ngIf="!blog && !loading">
      <div class="container">
        <div class="not-found-content">
          <h2>Blog Post Not Found</h2>
          <p>The blog post you are looking for does not exist or has been removed.</p>
          <a routerLink="/blog" class="btn btn-primary">Back to All Blogs</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .blog-detail-section {
      padding-top: var(--space-16);
    }
    
    .blog-header {
      background-color: var(--primary-900);
      color: white;
      padding: var(--space-12) 0;
      margin-bottom: var(--space-8);
    }
    
    .blog-header h1 {
      font-size: var(--text-4xl);
      margin-bottom: var(--space-4);
      line-height: 1.2;
    }
    
    .blog-meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4);
      color: var(--neutral-300);
    }
    
    .blog-author {
      font-weight: 500;
    }
    
    .blog-category {
      color: var(--primary-300);
    }
    
    .blog-detail-container {
      max-width: 900px;
      margin: 0 auto;
      padding: var(--space-8) 0 var(--space-16);
    }
    
    .blog-featured-image {
      margin-bottom: var(--space-8);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    
    .blog-featured-image img {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
    }
    
    .blog-content {
      margin-bottom: var(--space-8);
    }
    
    .blog-summary {
      font-size: var(--text-xl);
      font-weight: 500;
      color: var(--text-secondary);
      margin-bottom: var(--space-6);
      line-height: var(--leading-relaxed);
      padding-bottom: var(--space-6);
      border-bottom: 1px solid var(--border-color);
    }
    
    .blog-main-content {
      font-size: var(--text-lg);
      line-height: var(--leading-relaxed);
      margin-bottom: var(--space-8);
    }
    
    .blog-tags {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      margin-top: var(--space-8);
      flex-wrap: wrap;
    }
    
    .tag-label {
      font-weight: 500;
    }
    
    .tags-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .tag {
      padding: var(--space-1) var(--space-3);
      background-color: var(--primary-100);
      color: var(--primary-800);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
    }
    
    .blog-navigation {
      display: flex;
      justify-content: space-between;
      margin-top: var(--space-8);
      padding-top: var(--space-8);
      border-top: 1px solid var(--border-color);
    }
    
    .not-found {
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .not-found-content {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: var(--space-8);
      background-color: var(--background-secondary);
      border-radius: var(--radius-lg);
    }
    
    .not-found h2 {
      margin-bottom: var(--space-4);
    }
    
    .not-found p {
      margin-bottom: var(--space-6);
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: BlogPost | undefined;
  loading = true;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentService,
    private languageService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.contentService.getBlogById(parseInt(id, 10)).subscribe(blog => {
          this.blog = blog;
          this.loading = false;
          
          if (!blog) {
            this.router.navigate(['/blog']);
          }
        });
      } else {
        this.router.navigate(['/blog']);
      }
    });
  }
  
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