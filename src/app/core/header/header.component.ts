import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { ThemeService } from '../services/theme.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  template: `
    <header [ngClass]="{'scrolled': isScrolled, 'mobile-open': mobileMenuOpen}">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">
              <h1>Sudhir JSK</h1>
            </a>
          </div>

          <nav class="desktop-nav">
            <ul>
              <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{translate('nav.home')}}</a></li>
              <li><a routerLink="/about" routerLinkActive="active">{{translate('nav.about')}}</a></li>
              <li><a routerLink="/services" routerLinkActive="active">{{translate('nav.services')}}</a></li>
              <li><a routerLink="/contact" routerLinkActive="active">{{translate('nav.contact')}}</a></li>
              <li><a routerLink="/blog" routerLinkActive="active">{{translate('nav.blog')}}</a></li>
              <li><a routerLink="/gallery" routerLinkActive="active">{{translate('nav.gallery')}}</a></li>
            </ul>
          </nav>

          <div class="header-actions">
            <button 
              class="theme-toggle" 
              (click)="toggleTheme()" 
              [attr.aria-label]="getCurrentTheme() === 'dark' ? translate('common.lightMode') : translate('common.darkMode')"
            >
              <span class="icon" aria-hidden="true">
                {{ getCurrentTheme() === 'dark' ? '☀️' : '🌙' }}
              </span>
            </button>

            <button 
              class="language-toggle" 
              (click)="toggleLanguage()" 
              [attr.aria-label]="getCurrentLanguage() === 'en' ? 'हिंदी' : 'English'"
            >
              {{ getCurrentLanguage() === 'en' ? 'हिंदी' : 'EN' }}
            </button>

            <button class="mobile-menu-toggle" (click)="toggleMobileMenu()" aria-label="Toggle menu">
              <span [ngClass]="{'open': mobileMenuOpen}"></span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="mobile-nav" [ngClass]="{'open': mobileMenuOpen}">
        <nav>
          <ul>
            <li><a routerLink="/" (click)="closeMobileMenu()">{{translate('nav.home')}}</a></li>
            <li><a routerLink="/about" (click)="closeMobileMenu()">{{translate('nav.about')}}</a></li>
            <li><a routerLink="/services" (click)="closeMobileMenu()">{{translate('nav.services')}}</a></li>
            <li><a routerLink="/contact" (click)="closeMobileMenu()">{{translate('nav.contact')}}</a></li>
            <li><a routerLink="/blog" (click)="closeMobileMenu()">{{translate('nav.blog')}}</a></li>
            <li><a routerLink="/gallery" (click)="closeMobileMenu()">{{translate('nav.gallery')}}</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: var(--z-50);
      padding: var(--space-4) 0;
      transition: background-color var(--transition-normal) var(--ease-out),
                  box-shadow var(--transition-normal) var(--ease-out),
                  padding var(--transition-normal) var(--ease-out);
      background-color: transparent;
    }

    header.scrolled {
      background-color: var(--background-primary);
      box-shadow: var(--shadow-md);
      padding: var(--space-2) 0;
    }

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      z-index: var(--z-10);
    }

    .logo a {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .logo h1 {
      font-size: var(--text-xl);
      font-weight: 700;
      color: var(--primary-800);
      margin: 0;
      transition: color var(--transition-normal) var(--ease-out);
    }

    .desktop-nav {
      display: none;
    }

    @media (min-width: 768px) {
      .desktop-nav {
        display: block;
      }
    }

    .desktop-nav ul {
      display: flex;
      list-style: none;
      gap: var(--space-6);
    }

    .desktop-nav a {
      text-decoration: none;
      color: var(--text-primary);
      font-weight: 500;
      position: relative;
      transition: color var(--transition-fast) var(--ease-out);
      padding: var(--space-2) 0;
    }

    .desktop-nav a:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-600);
      transition: width var(--transition-normal) var(--ease-out);
    }

    .desktop-nav a:hover,
    .desktop-nav a.active {
      color: var(--primary-700);
    }

    .desktop-nav a:hover:after,
    .desktop-nav a.active:after {
      width: 100%;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }

    .theme-toggle,
    .language-toggle {
      background: none;
      border: none;
      cursor: pointer;
      font-size: var(--text-base);
      color: var(--text-primary);
      padding: var(--space-1);
      border-radius: var(--radius-full);
      transition: background-color var(--transition-fast) var(--ease-out),
                  transform var(--transition-fast) var(--ease-out);
    }

    .theme-toggle:hover,
    .language-toggle:hover {
      background-color: var(--background-tertiary);
      transform: scale(1.1);
    }

    .mobile-menu-toggle {
      display: block;
      z-index: var(--z-20);
      background: none;
      border: none;
      cursor: pointer;
      width: 32px;
      height: 32px;
      position: relative;
    }

    @media (min-width: 768px) {
      .mobile-menu-toggle {
        display: none;
      }
    }

    .mobile-menu-toggle span {
      display: block;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 100%;
      height: 2px;
      background-color: var(--text-primary);
      transition: background-color var(--transition-fast) var(--ease-out);
    }

    .mobile-menu-toggle span::before,
    .mobile-menu-toggle span::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: var(--text-primary);
      transition: transform var(--transition-fast) var(--ease-out);
    }

    .mobile-menu-toggle span::before {
      top: -8px;
    }

    .mobile-menu-toggle span::after {
      bottom: -8px;
    }

    .mobile-menu-toggle span.open {
      background-color: transparent;
    }

    .mobile-menu-toggle span.open::before {
      transform: translateY(8px) rotate(45deg);
    }

    .mobile-menu-toggle span.open::after {
      transform: translateY(-8px) rotate(-45deg);
    }

    .mobile-nav {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      height: 100vh;
      background-color: var(--background-primary);
      z-index: var(--z-10);
      transition: right var(--transition-normal) var(--ease-out);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mobile-nav.open {
      right: 0;
    }

    .mobile-nav ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: center;
    }

    .mobile-nav li {
      margin: var(--space-6) 0;
    }

    .mobile-nav a {
      font-size: var(--text-2xl);
      color: var(--text-primary);
      text-decoration: none;
      font-weight: 600;
      transition: color var(--transition-fast) var(--ease-out);
    }

    .mobile-nav a:hover {
      color: var(--primary-600);
    }
  `]
})
export class HeaderComponent {
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }

  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    // Prevent body scrolling when menu is open
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}