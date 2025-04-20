import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'en' | 'hi';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<Language>('en');
  public language$ = this.languageSubject.asObservable();

  // Translation mappings
  private translations: Record<string, Record<string, string>> = {
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.about': 'About Us',
      'nav.services': 'Services',
      'nav.contact': 'Contact',
      'nav.blog': 'Blog',
      'nav.gallery': 'Gallery',
      
      // Home page
      'home.hero.title': 'Welcome to Sarthak Digital Seva',
      'home.hero.subtitle': 'Serving the community with dedication and care',
      'home.hero.cta': 'Our Services',
      'home.services.title': 'Our Services',
      'home.services.viewAll': 'View All Services',
      'home.about.title': 'About Us',
      'home.about.description': 'Sarthak Digital Seva is dedicated to providing essential services to citizens, making government services more accessible to the common people.',
      'home.about.readMore': 'Read More',
      'home.testimonials.title': 'What People Say',
      'home.blog.title': 'Latest Updates',
      'home.blog.viewAll': 'View All Posts',
      'home.contact.title': 'Get in Touch',
      'home.contact.cta': 'Contact Us',
      
      // About page
      'about.title': 'About Sarthak Digital Seva',
      'about.subtitle': 'Our journey of service and commitment',
      'about.mission.title': 'Our Mission',
      'about.mission.description': 'To bridge the gap between government services and citizens by providing efficient, transparent, and accessible service delivery.',
      'about.vision.title': 'Our Vision',
      'about.vision.description': 'To create a society where every citizen has easy access to all government services without hassle or delay.',
      'about.values.title': 'Our Values',
      'about.values.integrity': 'Integrity',
      'about.values.transparency': 'Transparency',
      'about.values.excellence': 'Excellence',
      'about.values.accessibility': 'Accessibility',
      'about.team.title': 'Our Team',
      
      // Services page
      'services.title': 'Our Services',
      'services.subtitle': 'Comprehensive solutions for your needs',
      'services.categories': 'Service Categories',
      'services.search': 'Search services...',
      
      // Contact page
      'contact.title': 'Contact Us',
      'contact.subtitle': 'We\'re here to help and answer any question you might have',
      'contact.form.name': 'Your Name',
      'contact.form.email': 'Email Address',
      'contact.form.phone': 'Phone Number',
      'contact.form.subject': 'Subject',
      'contact.form.message': 'Your Message',
      'contact.form.submit': 'Send Message',
      'contact.info.title': 'Contact Information',
      'contact.info.address': 'Address',
      'contact.info.phone': 'Phone',
      'contact.info.email': 'Email',
      'contact.info.hours': 'Working Hours',
      
      // Blog page
      'blog.title': 'Blog & Updates',
      'blog.subtitle': 'Stay informed with our latest news and articles',
      'blog.categories': 'Categories',
      'blog.search': 'Search articles...',
      'blog.readMore': 'Read More',
      
      // Gallery page
      'gallery.title': 'Photo Gallery',
      'gallery.subtitle': 'Visual journey through our services and events',
      'gallery.categories': 'Categories',
      
      // Footer
      'footer.rights': 'All Rights Reserved',
      'footer.quickLinks': 'Quick Links',
      'footer.subscribe.title': 'Subscribe to Newsletter',
      'footer.subscribe.placeholder': 'Your email address',
      'footer.subscribe.button': 'Subscribe',
      'footer.followUs': 'Follow Us',
      
      // Common
      'common.loading': 'Loading...',
      'common.readMore': 'Read More',
      'common.viewAll': 'View All',
      'common.backToTop': 'Back to Top',
      'common.language': 'Language',
      'common.theme': 'Theme',
      'common.lightMode': 'Light Mode',
      'common.darkMode': 'Dark Mode'
    },
    hi: {
      // Navigation
      'nav.home': 'होम',
      'nav.about': 'हमारे बारे में',
      'nav.services': 'सेवाएं',
      'nav.contact': 'संपर्क',
      'nav.blog': 'ब्लॉग',
      'nav.gallery': 'गैलरी',
      
      // Home page
      'home.hero.title': 'सार्थक डिजिटल सेवा में आपका स्वागत है',
      'home.hero.subtitle': 'समर्पण और देखभाल के साथ समुदाय की सेवा',
      'home.hero.cta': 'हमारी सेवाएं',
      'home.services.title': 'हमारी सेवाएं',
      'home.services.viewAll': 'सभी सेवाएं देखें',
      'home.about.title': 'हमारे बारे में',
      'home.about.description': 'सार्थक डिजिटल सेवा केंद्र नागरिकों को आवश्यक सेवाएं प्रदान करने के लिए समर्पित है, जो सरकारी सेवाओं को आम लोगों के लिए अधिक सुलभ बनाता है।',
      'home.about.readMore': 'और पढ़ें',
      'home.testimonials.title': 'लोग क्या कहते हैं',
      'home.blog.title': 'नवीनतम अपडेट',
      'home.blog.viewAll': 'सभी पोस्ट देखें',
      'home.contact.title': 'संपर्क करें',
      'home.contact.cta': 'संपर्क करें',
      
      // About page
      'about.title': 'सार्थक डिजिटल सेवा केंद्र के बारे में',
      'about.subtitle': 'सेवा और प्रतिबद्धता की हमारी यात्रा',
      'about.mission.title': 'हमारा मिशन',
      'about.mission.description': 'कुशल, पारदर्शी और सुलभ सेवा वितरण प्रदान करके सरकारी सेवाओं और नागरिकों के बीच की खाई को पाटना।',
      'about.vision.title': 'हमारा विज़न',
      'about.vision.description': 'एक ऐसा समाज बनाना जहां हर नागरिक को बिना परेशानी या देरी के सभी सरकारी सेवाओं तक आसान पहुंच हो।',
      'about.values.title': 'हमारे मूल्य',
      'about.values.integrity': 'ईमानदारी',
      'about.values.transparency': 'पारदर्शिता',
      'about.values.excellence': 'उत्कृष्टता',
      'about.values.accessibility': 'पहुंच',
      'about.team.title': 'हमारी टीम',
      
      // Services page
      'services.title': 'हमारी सेवाएं',
      'services.subtitle': 'आपकी आवश्यकताओं के लिए व्यापक समाधान',
      'services.categories': 'सेवा श्रेणियां',
      'services.search': 'सेवाएं खोजें...',
      
      // Contact page
      'contact.title': 'संपर्क करें',
      'contact.subtitle': 'हम आपके किसी भी प्रश्न का उत्तर देने के लिए यहां हैं',
      'contact.form.name': 'आपका नाम',
      'contact.form.email': 'ईमेल पता',
      'contact.form.phone': 'फोन नंबर',
      'contact.form.subject': 'विषय',
      'contact.form.message': 'आपका संदेश',
      'contact.form.submit': 'संदेश भेजें',
      'contact.info.title': 'संपर्क जानकारी',
      'contact.info.address': 'पता',
      'contact.info.phone': 'फोन',
      'contact.info.email': 'ईमेल',
      'contact.info.hours': 'कार्य समय',
      
      // Blog page
      'blog.title': 'ब्लॉग और अपडेट',
      'blog.subtitle': 'हमारे नवीनतम समाचार और लेखों के साथ सूचित रहें',
      'blog.categories': 'श्रेणियां',
      'blog.search': 'लेख खोजें...',
      'blog.readMore': 'और पढ़ें',
      
      // Gallery page
      'gallery.title': 'फोटो गैलरी',
      'gallery.subtitle': 'हमारी सेवाओं और कार्यक्रमों के माध्यम से दृश्य यात्रा',
      'gallery.categories': 'श्रेणियां',
      
      // Footer
      'footer.rights': 'सभी अधिकार सुरक्षित',
      'footer.quickLinks': 'त्वरित लिंक',
      'footer.subscribe.title': 'न्यूज़लेटर के लिए सदस्यता लें',
      'footer.subscribe.placeholder': 'आपका ईमेल पता',
      'footer.subscribe.button': 'सदस्यता लें',
      'footer.followUs': 'हमें फॉलो करें',
      
      // Common
      'common.loading': 'लोड हो रहा है...',
      'common.readMore': 'और पढ़ें',
      'common.viewAll': 'सभी देखें',
      'common.backToTop': 'वापस शीर्ष पर',
      'common.language': 'भाषा',
      'common.theme': 'थीम',
      'common.lightMode': 'लाइट मोड',
      'common.darkMode': 'डार्क मोड'
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initializeLanguage(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Check for saved language preference
      const savedLanguage = localStorage.getItem('language') as Language;
      
      if (savedLanguage) {
        this.setLanguage(savedLanguage);
      } else {
        // Default to browser language if available and supported
        const browserLang = navigator.language.split('-')[0];
        this.setLanguage((browserLang === 'hi' ? 'hi' : 'en') as Language);
      }
    }
  }

  setLanguage(language: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      // Save language preference
      localStorage.setItem('language', language);
      
      // Update document body class for language-specific styling
      if (language === 'hi') {
        document.body.classList.add('lang-hi');
        document.body.classList.remove('lang-en');
      } else {
        document.body.classList.add('lang-en');
        document.body.classList.remove('lang-hi');
      }
      
      // Update the subject
      this.languageSubject.next(language);
    }
  }

  toggleLanguage(): void {
    const currentLanguage = this.languageSubject.getValue();
    const newLanguage: Language = currentLanguage === 'en' ? 'hi' : 'en';
    this.setLanguage(newLanguage);
  }

  getCurrentLanguage(): Language {
    return this.languageSubject.getValue();
  }

  translate(key: string): string {
    const currentLanguage = this.languageSubject.getValue();
    return this.translations[currentLanguage][key] || key;
  }
}