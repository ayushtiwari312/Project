import { Injectable } from '@angular/core';
import { ServiceItem, BlogPost, TeamMember, Testimonial, GalleryItem } from '../models/content.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private services: ServiceItem[] = [
    {
      id: 1,
      title: 'Aadhaar Card Services',
      titleHi: 'आधार कार्ड सेवाएं',
      description: 'Aadhaar enrollment, update, and printing services.',
      descriptionHi: 'आधार नामांकन, अपडेट और प्रिंटिंग सेवाएं।',
      icon: 'id-card',
      category: 'Identity',
      categoryHi: 'पहचान',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'PAN Card Services',
      titleHi: 'पैन कार्ड सेवाएं',
      description: 'Apply for new PAN card, corrections, and reprinting.',
      descriptionHi: 'नए पैन कार्ड के लिए आवेदन, सुधार और रीप्रिंटिंग।',
      icon: 'credit-card',
      category: 'Identity',
      categoryHi: 'पहचान',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Passport Services',
      titleHi: 'पासपोर्ट सेवाएं',
      description: 'Passport application assistance and document verification.',
      descriptionHi: 'पासपोर्ट आवेदन सहायता और दस्तावेज सत्यापन।',
      icon: 'passport',
      category: 'Travel',
      categoryHi: 'यात्रा',
      image: 'https://images.unsplash.com/photo-1568321612103-3281d10b89c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Digital Certificate',
      titleHi: 'डिजिटल प्रमाणपत्र',
      description: 'Digital signature certificates for e-filing and verification.',
      descriptionHi: 'ई-फाइलिंग और सत्यापन के लिए डिजिटल हस्ताक्षर प्रमाणपत्र।',
      icon: 'file-signature',
      category: 'Digital',
      categoryHi: 'डिजिटल',
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Voter ID Services',
      titleHi: 'वोटर आईडी सेवाएं',
      description: 'New voter ID application, corrections, and updates.',
      descriptionHi: 'नए वोटर आईडी आवेदन, सुधार और अपडेट।',
      icon: 'vote-yea',
      category: 'Identity',
      categoryHi: 'पहचान',
      image: 'https://images.unsplash.com/photo-1540126034813-121bf29033d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Banking Services',
      titleHi: 'बैंकिंग सेवाएं',
      description: 'Bank account opening, loan application assistance.',
      descriptionHi: 'बैंक खाता खोलना, ऋण आवेदन सहायता।',
      icon: 'university',
      category: 'Finance',
      categoryHi: 'वित्त',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      title: 'Insurance Services',
      titleHi: 'बीमा सेवाएं',
      description: 'Life, health, vehicle insurance application and claims.',
      descriptionHi: 'जीवन, स्वास्थ्य, वाहन बीमा आवेदन और दावे।',
      icon: 'shield-alt',
      category: 'Finance',
      categoryHi: 'वित्त',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'Online Bill Payments',
      titleHi: 'ऑनलाइन बिल भुगतान',
      description: 'Electricity, water, mobile, DTH recharge services.',
      descriptionHi: 'बिजली, पानी, मोबाइल, डीटीएच रिचार्ज सेवाएं।',
      icon: 'file-invoice',
      category: 'Payments',
      categoryHi: 'भुगतान',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  private blogs: BlogPost[] = [
    {
      id: 1,
      title: 'New Aadhaar Services Available',
      titleHi: 'नई आधार सेवाएं उपलब्ध',
      summary: 'Learn about the latest Aadhaar services now available at our center.',
      summaryHi: 'हमारे केंद्र पर अब उपलब्ध नवीनतम आधार सेवाओं के बारे में जानें।',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.',
      contentHi: 'लोरेम इप्सम डोलर सिट अमेट, कॉन्सेक्टेटुर एडिपिसिंग एलिट। नुल्ला क्वाम वेलिट, वल्पुटेट यू फैरेट्रा नेक, मैटिस एसी नेक्वे। दुइस वल्पुटेट कोम्मोडो लेक्टस, एसी ब्लंडिट एलिट टिंसिडुंट आईडी।',
      author: 'Rajesh Kumar',
      authorHi: 'राजेश कुमार',
      date: '2023-06-15',
      category: 'Services',
      categoryHi: 'सेवाएं',
      image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Aadhaar', 'Identity', 'Government'],
      tagsHi: ['आधार', 'पहचान', 'सरकार']
    },
    {
      id: 2,
      title: 'Digital Payments Made Easy',
      titleHi: 'डिजिटल भुगतान आसान बनाया गया',
      summary: 'A guide to using various digital payment options at our service center.',
      summaryHi: 'हमारे सेवा केंद्र पर विभिन्न डिजिटल भुगतान विकल्पों का उपयोग करने के लिए एक मार्गदर्शक।',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.',
      contentHi: 'लोरेम इप्सम डोलर सिट अमेट, कॉन्सेक्टेटुर एडिपिसिंग एलिट। नुल्ला क्वाम वेलिट, वल्पुटेट यू फैरेट्रा नेक, मैटिस एसी नेक्वे। दुइस वल्पुटेट कोम्मोडो लेक्टस, एसी ब्लंडिट एलिट टिंसिडुंट आईडी।',
      author: 'Priya Singh',
      authorHi: 'प्रिया सिंह',
      date: '2023-05-22',
      category: 'Digital',
      categoryHi: 'डिजिटल',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Digital', 'Payments', 'Technology'],
      tagsHi: ['डिजिटल', 'भुगतान', 'तकनीक']
    },
    {
      id: 3,
      title: 'Passport Application Process Simplified',
      titleHi: 'पासपोर्ट आवेदन प्रक्रिया सरल बनाई गई',
      summary: 'Step-by-step guide to applying for a passport with our assistance.',
      summaryHi: 'हमारी सहायता से पासपोर्ट के लिए आवेदन करने के लिए चरण-दर-चरण मार्गदर्शक।',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.',
      contentHi: 'लोरेम इप्सम डोलर सिट अमेट, कॉन्सेक्टेटुर एडिपिसिंग एलिट। नुल्ला क्वाम वेलिट, वल्पुटेट यू फैरेट्रा नेक, मैटिस एसी नेक्वे। दुइस वल्पुटेट कोम्मोडो लेक्टस, एसी ब्लंडिट एलिट टिंसिडुंट आईडी।',
      author: 'Vikram Sharma',
      authorHi: 'विक्रम शर्मा',
      date: '2023-04-10',
      category: 'Travel',
      categoryHi: 'यात्रा',
      image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Passport', 'Travel', 'Documents'],
      tagsHi: ['पासपोर्ट', 'यात्रा', 'दस्तावेज़']
    }
  ];

  private team: TeamMember[] = [
    {
      id: 1,
      name: 'Sudhir Patel',
      nameHi: 'सुधीर पटेल',
      role: 'Founder & Director',
      roleHi: 'संस्थापक और निदेशक',
      bio: 'With over 15 years of experience in public service, Sudhir has dedicated his career to making government services accessible to all.',
      bioHi: 'सार्वजनिक सेवा में 15 वर्षों से अधिक के अनुभव के साथ, सुधीर ने सरकारी सेवाओं को सभी के लिए सुलभ बनाने के लिए अपना करियर समर्पित किया है।',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'Aarti Sharma',
      nameHi: 'आरती शर्मा',
      role: 'Service Manager',
      roleHi: 'सेवा प्रबंधक',
      bio: 'Aarti manages our service delivery team and ensures each client receives prompt and effective assistance.',
      bioHi: 'आरती हमारी सेवा वितरण टीम का प्रबंधन करती है और सुनिश्चित करती है कि प्रत्येक ग्राहक को त्वरित और प्रभावी सहायता मिले।',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Amit Verma',
      nameHi: 'अमित वर्मा',
      role: 'Technical Specialist',
      roleHi: 'तकनीकी विशेषज्ञ',
      bio: 'Amit handles all technical aspects of our services, ensuring smooth operations of our digital systems.',
      bioHi: 'अमित हमारी सेवाओं के सभी तकनीकी पहलुओं को संभालते हैं, हमारे डिजिटल सिस्टम के सुचारू संचालन को सुनिश्चित करते हैं।',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Neha Gupta',
      nameHi: 'नेहा गुप्ता',
      role: 'Customer Relations',
      roleHi: 'ग्राहक संबंध',
      bio: 'Neha ensures that all clients receive the best possible experience at our center, managing customer feedback and improvements.',
      bioHi: 'नेहा सुनिश्चित करती है कि सभी ग्राहकों को हमारे केंद्र पर सर्वोत्तम संभव अनुभव मिले, ग्राहक प्रतिक्रिया और सुधार का प्रबंधन करे।',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ravi Kumar',
      nameHi: 'रवि कुमार',
      role: 'Business Owner',
      roleHi: 'व्यवसाय मालिक',
      comment: 'The service I received at Sudhir Jan Seva Kendra was exceptional. They helped me get my Aadhaar updated in just one visit!',
      commentHi: 'सुधीर जन सेवा केंद्र पर मुझे मिली सेवा असाधारण थी। उन्होंने मुझे सिर्फ एक यात्रा में मेरा आधार अपडेट करवाने में मदद की!',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 5
    },
    {
      id: 2,
      name: 'Sunita Patel',
      nameHi: 'सुनीता पटेल',
      role: 'Teacher',
      roleHi: 'शिक्षिका',
      comment: 'I was struggling with my PAN card application, but the team helped me complete it efficiently. Highly recommended!',
      commentHi: 'मैं अपने पैन कार्ड आवेदन के साथ संघर्ष कर रही थी, लेकिन टीम ने मुझे इसे कुशलतापूर्वक पूरा करने में मदद की। अत्यधिक अनुशंसित!',
      image: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4
    },
    {
      id: 3,
      name: 'Mohan Singh',
      nameHi: 'मोहन सिंह',
      role: 'Retired Government Employee',
      roleHi: 'सेवानिवृत्त सरकारी कर्मचारी',
      comment: 'As a senior citizen, I was worried about navigating digital services, but the staff was patient and guided me through everything.',
      commentHi: 'एक वरिष्ठ नागरिक के रूप में, मैं डिजिटल सेवाओं का उपयोग करने के बारे में चिंतित था, लेकिन स्टाफ धैर्यवान था और मुझे सब कुछ समझाया।',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 5
    }
  ];

  private gallery: GalleryItem[] = [
    {
      id: 1,
      title: 'New Office Inauguration',
      titleHi: 'नए कार्यालय का उद्घाटन',
      description: 'Opening ceremony of our new branch in the city center.',
      descriptionHi: 'शहर के केंद्र में हमारी नई शाखा का उद्घाटन समारोह।',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Events',
      categoryHi: 'कार्यक्रम',
      date: '2023-03-15'
    },
    {
      id: 2,
      title: 'Digital Literacy Workshop',
      titleHi: 'डिजिटल साक्षरता कार्यशाला',
      description: 'Free workshop for senior citizens to help them navigate digital services.',
      descriptionHi: 'वरिष्ठ नागरिकों के लिए निःशुल्क कार्यशाला, उन्हें डिजिटल सेवाओं का उपयोग करने में मदद करने के लिए।',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Workshops',
      categoryHi: 'कार्यशालाएं',
      date: '2023-02-20'
    },
    {
      id: 3,
      title: 'Community Service Drive',
      titleHi: 'सामुदायिक सेवा अभियान',
      description: 'Our team providing free services in rural areas as part of our outreach program.',
      descriptionHi: 'हमारे आउटरीच प्रोग्राम के हिस्से के रूप में हमारी टीम ग्रामीण क्षेत्रों में निःशुल्क सेवाएं प्रदान कर रही है।',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Community',
      categoryHi: 'समुदाय',
      date: '2023-01-10'
    },
    {
      id: 4,
      title: 'Service Center Operations',
      titleHi: 'सेवा केंद्र संचालन',
      description: 'A look at our daily operations and service delivery process.',
      descriptionHi: 'हमारे दैनिक संचालन और सेवा वितरण प्रक्रिया पर एक नज़र।',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Operations',
      categoryHi: 'संचालन',
      date: '2022-12-05'
    },
    {
      id: 5,
      title: 'Award Ceremony',
      titleHi: 'पुरस्कार समारोह',
      description: 'Our center receiving recognition for excellence in service delivery.',
      descriptionHi: 'हमारा केंद्र सेवा वितरण में उत्कृष्टता के लिए मान्यता प्राप्त कर रहा है।',
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Recognition',
      categoryHi: 'मान्यता',
      date: '2022-11-18'
    },
    {
      id: 6,
      title: 'Customer Service Area',
      titleHi: 'ग्राहक सेवा क्षेत्र',
      description: 'Our newly renovated customer service area designed for comfort and efficiency.',
      descriptionHi: 'हमारा नवीनीकृत ग्राहक सेवा क्षेत्र आराम और दक्षता के लिए डिज़ाइन किया गया है।',
      image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      category: 'Facilities',
      categoryHi: 'सुविधाएं',
      date: '2022-10-25'
    }
  ];

  constructor() { }

  getServices(): Observable<ServiceItem[]> {
    return of(this.services);
  }

  getServiceById(id: number): Observable<ServiceItem | undefined> {
    return of(this.services.find(service => service.id === id));
  }

  getBlogs(): Observable<BlogPost[]> {
    return of(this.blogs);
  }

  getBlogById(id: number): Observable<BlogPost | undefined> {
    return of(this.blogs.find(blog => blog.id === id));
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(this.team);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  getGalleryItems(): Observable<GalleryItem[]> {
    return of(this.gallery);
  }
}