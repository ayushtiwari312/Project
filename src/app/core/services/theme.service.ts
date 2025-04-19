import { Injectable, Renderer2, RendererFactory2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeSubject = new BehaviorSubject<Theme>('light');
  public theme$ = this.themeSubject.asObservable();

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initializeTheme(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme') as Theme;
      
      // If no saved preference, check system preference
      if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
        return;
      }
      
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: Theme): void {
    if (isPlatformBrowser(this.platformId)) {
      // Save theme preference
      localStorage.setItem('theme', theme);
      
      // Update the HTML root class
      const html = document.documentElement;
      
      if (theme === 'dark') {
        this.renderer.addClass(html, 'dark-mode');
      } else {
        this.renderer.removeClass(html, 'dark-mode');
      }
      
      // Update the subject
      this.themeSubject.next(theme);
    }
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.getValue();
    const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.getValue();
  }
}