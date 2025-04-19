import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="container">
        <h1>{{ translate('contact.title') }}</h1>
        <p>{{ translate('contact.subtitle') }}</p>
      </div>
    </section>

    <section class="section contact-section">
      <div class="container">
        <div class="contact-container">
          <div class="contact-form">
            <h2>Send us a message</h2>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="name" class="form-label">{{ translate('contact.form.name') }}</label>
                <input type="text" id="name" formControlName="name" class="form-input" [ngClass]="{'invalid': isInvalid('name')}">
                <div *ngIf="isInvalid('name')" class="error-message">Name is required</div>
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">{{ translate('contact.form.email') }}</label>
                <input type="email" id="email" formControlName="email" class="form-input" [ngClass]="{'invalid': isInvalid('email')}">
                <div *ngIf="isInvalid('email')" class="error-message">
                  {{ contactForm.get('email')?.errors?.['required'] ? 'Email is required' : 'Please enter a valid email' }}
                </div>
              </div>
              
              <div class="form-group">
                <label for="phone" class="form-label">{{ translate('contact.form.phone') }}</label>
                <input type="tel" id="phone" formControlName="phone" class="form-input" [ngClass]="{'invalid': isInvalid('phone')}">
                <div *ngIf="isInvalid('phone')" class="error-message">Please enter a valid phone number</div>
              </div>
              
              <div class="form-group">
                <label for="subject" class="form-label">{{ translate('contact.form.subject') }}</label>
                <input type="text" id="subject" formControlName="subject" class="form-input" [ngClass]="{'invalid': isInvalid('subject')}">
                <div *ngIf="isInvalid('subject')" class="error-message">Subject is required</div>
              </div>
              
              <div class="form-group">
                <label for="message" class="form-label">{{ translate('contact.form.message') }}</label>
                <textarea 
                  id="message" 
                  formControlName="message" 
                  rows="5" 
                  class="form-input" 
                  [ngClass]="{'invalid': isInvalid('message')}"
                ></textarea>
                <div *ngIf="isInvalid('message')" class="error-message">Message is required and must be at least 10 characters</div>
              </div>
              
              <button type="submit" class="btn btn-primary" [disabled]="contactForm.invalid || submitted">
                {{ submitted ? 'Sending...' : translate('contact.form.submit') }}
              </button>
              
              <div *ngIf="formSubmitted" class="success-message">
                Your message has been sent successfully. We'll get back to you soon!
              </div>
            </form>
          </div>
          
          <div class="contact-info">
            <h2>{{ translate('contact.info.title') }}</h2>
            
            <div class="info-item">
              <div class="info-icon">📍</div>
              <div class="info-content">
                <h3>{{ translate('contact.info.address') }}</h3>
                <p>123 Main Street, City Center,<br>Delhi - 110001, India</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">📞</div>
              <div class="info-content">
                <h3>{{ translate('contact.info.phone') }}</h3>
                <p>+91 98765 43210<br>+91 12345 67890</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">✉️</div>
              <div class="info-content">
                <h3>{{ translate('contact.info.email') }}</h3>
                <p>infosudhirjsk.com<br>supportsudhirjsk.com</p>
              </div>
            </div>
            
            <div class="info-item">
              <div class="info-icon">⏰</div>
              <div class="info-content">
                <h3>{{ translate('contact.info.hours') }}</h3>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM<br>Sunday: Closed</p>
              </div>
            </div>
            
            <div class="map">
              <!-- This would be a Google Map in a real application -->
              <div class="map-placeholder">Map Location</div>
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
    
    .contact-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-8);
    }
    
    @media (min-width: 1024px) {
      .contact-container {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    .contact-form, .contact-info {
      background-color: var(--background-secondary);
      border-radius: var(--radius-lg);
      padding: var(--space-8);
    }
    
    .contact-form h2, .contact-info h2 {
      margin-bottom: var(--space-6);
      position: relative;
      padding-bottom: var(--space-3);
    }
    
    .contact-form h2:after, .contact-info h2:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary-600);
      border-radius: var(--radius-full);
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
    
    .invalid {
      border-color: var(--error-500);
    }
    
    .error-message {
      color: var(--error-500);
      font-size: var(--text-sm);
      margin-top: var(--space-1);
    }
    
    .success-message {
      margin-top: var(--space-4);
      padding: var(--space-3);
      background-color: var(--success-500);
      color: white;
      border-radius: var(--radius-md);
      animation: fadeIn var(--transition-normal) var(--ease-out);
    }
    
    .info-item {
      display: flex;
      gap: var(--space-4);
      margin-bottom: var(--space-6);
    }
    
    .info-icon {
      font-size: var(--text-2xl);
      width: 50px;
      height: 50px;
      background-color: var(--primary-100);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .info-content h3 {
      font-size: var(--text-lg);
      margin-bottom: var(--space-2);
    }
    
    .info-content p {
      color: var(--text-secondary);
    }
    
    .map {
      margin-top: var(--space-6);
      border-radius: var(--radius-lg);
      overflow: hidden;
      height: 250px;
    }
    
    .map-placeholder {
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-tertiary);
      font-weight: 500;
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  formSubmitted = false;
  
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  isInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
  
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.submitted = true;
      
      // Simulate API call
      setTimeout(() => {
        this.submitted = false;
        this.formSubmitted = true;
        this.contactForm.reset();
        // Reset form touched/dirty state
        Object.keys(this.contactForm.controls).forEach(key => {
          this.contactForm.get(key)?.setErrors(null);
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
      }, 1500);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }
  
  translate(key: string): string {
    return this.languageService.translate(key);
  }
}