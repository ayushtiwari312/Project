import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService } from '../../shared/services/content.service';
import { TeamMember } from '../../shared/models/content.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>{{ translate('about.title') }}</h1>
        <p>{{ translate('about.subtitle') }}</p>
      </div>
    </section>

    <section class="section about-section">
      <div class="container">
        <div class="about-story">
          <div class="about-image">
            <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="About Sudhir Jan Seva Kendra">
          </div>
          
          <div class="about-content">
            <div class="mission-vision">
              <div class="mission card">
                <h3>{{ translate('about.mission.title') }}</h3>
                <p>{{ translate('about.mission.description') }}</p>
              </div>
              
              <div class="vision card">
                <h3>{{ translate('about.vision.title') }}</h3>
                <p>{{ translate('about.vision.description') }}</p>
              </div>
            </div>

            <div class="values">
              <h3>{{ translate('about.values.title') }}</h3>
              <div class="values-grid">
                <div class="value-item">
                  <div class="value-icon">I</div>
                  <h4>{{ translate('about.values.integrity') }}</h4>
                  <p>We maintain the highest standards of honesty and ethical behavior in all our services.</p>
                </div>
                
                <div class="value-item">
                  <div class="value-icon">T</div>
                  <h4>{{ translate('about.values.transparency') }}</h4>
                  <p>We believe in clear communication and transparency in all our processes.</p>
                </div>
                
                <div class="value-item">
                  <div class="value-icon">E</div>
                  <h4>{{ translate('about.values.excellence') }}</h4>
                  <p>We strive for excellence in service delivery and customer satisfaction.</p>
                </div>
                
                <div class="value-item">
                  <div class="value-icon">A</div>
                  <h4>{{ translate('about.values.accessibility') }}</h4>
                  <p>We ensure our services are accessible to all, regardless of digital literacy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section team-section">
      <div class="container">
        <h2>{{ translate('about.team.title') }}</h2>
        
        <div class="team-grid">
          <div *ngFor="let member of team" class="team-member card">
            <div class="member-image">
              <img [src]="member.image" [alt]="getCurrentLanguage() === 'en' ? member.name : member.nameHi">
            </div>
            <div class="member-info">
              <h3>{{ getCurrentLanguage() === 'en' ? member.name : member.nameHi }}</h3>
              <p class="member-role">{{ getCurrentLanguage() === 'en' ? member.role : member.roleHi }}</p>
              <p class="member-bio">{{ getCurrentLanguage() === 'en' ? member.bio : member.bioHi }}</p>
            </div>
          </div>
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
    
    .about-story {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
    
    @media (min-width: 1024px) {
      .about-story {
        grid-template-columns: 1fr 2fr;
      }
    }
    
    .about-image {
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-lg);
    }
    
    .about-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .mission-vision {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }
    
    @media (min-width: 768px) {
      .mission-vision {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .mission, .vision {
      height: 100%;
    }
    
    .values {
      margin-top: var(--space-8);
    }
    
    .values h3 {
      margin-bottom: var(--space-6);
      text-align: center;
    }
    
    .values-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-6);
    }
    
    @media (min-width: 640px) {
      .values-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .values-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .value-item {
      text-align: center;
      padding: var(--space-4);
      border-radius: var(--radius-lg);
      background-color: var(--background-secondary);
      transition: transform var(--transition-normal) var(--ease-out);
    }
    
    .value-item:hover {
      transform: translateY(-5px);
    }
    
    .value-icon {
      width: 60px;
      height: 60px;
      border-radius: var(--radius-full);
      background-color: var(--primary-600);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-2xl);
      font-weight: 700;
      margin: 0 auto var(--space-4);
    }
    
    .value-item h4 {
      margin-bottom: var(--space-2);
      font-size: var(--text-lg);
    }
    
    .team-section {
      background-color: var(--background-secondary);
    }
    
    .team-section h2 {
      text-align: center;
      margin-bottom: var(--space-10);
    }
    
    .team-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: var(--space-6);
    }
    
    @media (min-width: 640px) {
      .team-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (min-width: 1024px) {
      .team-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .team-member {
      overflow: hidden;
    }
    
    .member-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      position: relative;
      margin: calc(var(--space-6) * -1) calc(var(--space-6) * -1) 0;
    }
    
    .member-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-normal) var(--ease-out);
    }
    
    .team-member:hover .member-image img {
      transform: scale(1.05);
    }
    
    .member-info {
      padding-top: var(--space-4);
    }
    
    .member-info h3 {
      margin-bottom: var(--space-1);
      font-size: var(--text-lg);
    }
    
    .member-role {
      color: var(--primary-600);
      font-weight: 500;
      margin-bottom: var(--space-2);
    }
    
    .member-bio {
      font-size: var(--text-sm);
      line-height: var(--leading-relaxed);
    }
  `]
})
export class AboutComponent implements OnInit {
  team: TeamMember[] = [];
  
  constructor(
    private contentService: ContentService,
    private languageService: LanguageService
  ) {}
  
  ngOnInit(): void {
    this.contentService.getTeamMembers().subscribe(team => {
      this.team = team;
    });
  }
  
  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
}