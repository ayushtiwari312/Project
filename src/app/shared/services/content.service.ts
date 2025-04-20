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
      title: 'Bank Account Opening',
      titleHi: 'बैंक खाता खोलना',
      description: 'Assistance in opening bank accounts with various banks, including documentation and verification.',
      descriptionHi: 'विभिन्न बैंकों में खाता खोलने में सहायता, दस्तावेज़ीकरण और सत्यापन सहित।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <path d="M32 4L4 16v4h56v-4L32 4z" fill="#4A4A4A"/>
        <rect x="8" y="20" width="4" height="32" fill="#7D7D7D"/>
        <rect x="16" y="20" width="4" height="32" fill="#7D7D7D"/>
        <rect x="24" y="20" width="4" height="32" fill="#7D7D7D"/>
        <rect x="32" y="20" width="4" height="32" fill="#7D7D7D"/>
        <rect x="40" y="20" width="4" height="32" fill="#7D7D7D"/>
        <rect x="48" y="20" width="4" height="32" fill="#7D7D7D"/>
        <rect x="4" y="52" width="56" height="6" fill="#4A4A4A"/>
      </svg>`,
      category: 'Banking',
      categoryHi: 'बैंकिंग',
      image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Aadhaar Enabled Payment System',
      titleHi: 'आधार सक्षम भुगतान प्रणाली',
      description: 'Secure transactions and payments using Aadhaar biometric authentication.',
      descriptionHi: 'आधार बायोमेट्रिक प्रमाणीकरण का उपयोग करके सुरक्षित लेनदेन और भुगतान।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" stroke="#4A4A4A" stroke-width="4"/>
        <path d="M20 32h24M32 20v24" stroke="#7D7D7D" stroke-width="4"/>
      </svg>`,
      category: 'Payments',
      categoryHi: 'भुगतान',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Income Certificate',
      titleHi: 'आय प्रमाण पत्र',
      description: 'Assistance in applying for and obtaining income certificates from relevant authorities.',
      descriptionHi: 'संबंधित अधिकारियों से आय प्रमाण पत्र प्राप्त करने में सहायता।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" fill="white"/>
        <polygon points="32,4 4,16 60,16" fill="#4A4A4A"/>
        <rect x="10" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="20" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="30" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="40" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="50" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="4" y="48" width="56" height="6" fill="#4A4A4A"/>
        <text x="32" y="62" font-size="6" text-anchor="middle" fill="#333">BANK</text>
      </svg>`,
      category: 'Certificates',
      categoryHi: 'प्रमाणपत्र',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Caste Certificate',
      titleHi: 'जाति प्रमाण पत्र',
      description: 'Support in obtaining caste certificates with proper documentation and verification.',
      descriptionHi: 'उचित दस्तावेज़ीकरण और सत्यापन के साथ जाति प्रमाण पत्र प्राप्त करने में सहायता।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect x="8" y="8" width="48" height="48" rx="4" stroke="#4A4A4A" stroke-width="4"/>
        <path d="M16 20h32M16 28h32M16 36h20" stroke="#7D7D7D" stroke-width="4"/>
      </svg>`,
      category: 'Certificates',
      categoryHi: 'प्रमाणपत्र',
      image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Domicile Certificate',
      titleHi: 'अधिवास प्रमाण पत्र',
      description: 'Assistance in applying for domicile certificates with required documentation.',
      descriptionHi: 'आवश्यक दस्तावेजों के साथ अधिवास प्रमाण पत्र के लिए आवेदन में सहायता।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <path d="M8 28L32 8l24 20v28a4 4 0 01-4 4H12a4 4 0 01-4-4V28z" fill="#4A4A4A"/>
        <rect x="24" y="36" width="16" height="20" fill="#7D7D7D"/>
      </svg>`,
      category: 'Certificates',
      categoryHi: 'प्रमाणपत्र',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Old Age Pension',
      titleHi: 'वृद्धावस्था पेंशन',
      description: 'Support in applying for and processing old age pension applications.',
      descriptionHi: 'वृद्धावस्था पेंशन आवेदनों को आवेदन और प्रसंस्करण में सहायता।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <circle cx="32" cy="24" r="12" fill="#7D7D7D"/>
        <rect x="24" y="36" width="16" height="20" rx="2" fill="#4A4A4A"/>
      </svg>`,
      category: 'Pension',
      categoryHi: 'पेंशन',
      image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      title: 'Widow Pension',
      titleHi: 'विधवा पेंशन',
      description: 'Assistance in widow pension application and documentation process.',
      descriptionHi: 'विधवा पेंशन आवेदन और दस्तावेज़ीकरण प्रक्रिया में सहायता।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" fill="white"/>
        <polygon points="32,4 4,16 60,16" fill="#4A4A4A"/>
        <rect x="10" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="20" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="30" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="40" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="50" y="16" width="4" height="32" fill="#7D7D7D"/>
        <rect x="4" y="48" width="56" height="6" fill="#4A4A4A"/>
        <text x="32" y="62" font-size="6" text-anchor="middle" fill="#333">BANK</text>
      </svg>`,
      category: 'Pension',
      categoryHi: 'पेंशन',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'Online Government Services',
      titleHi: 'ऑनलाइन सरकारी सेवाएं',
      description: 'Various online government services and documentation assistance.',
      descriptionHi: 'विभिन्न ऑनलाइन सरकारी सेवाएं और दस्तावेज़ीकरण सहायता।',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
        <rect x="12" y="16" width="40" height="32" rx="4" stroke="#4A4A4A" stroke-width="4"/>
        <path d="M20 28h24M20 36h24" stroke="#7D7D7D" stroke-width="4"/>
      </svg>`,
      category: 'Digital',
      categoryHi: 'डिजिटल',
      image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];
  

  private blogs: BlogPost[] = [
    {
      id: 1,
      title: 'Widow Pension Scheme in Uttar Pradesh: A Lifeline for Marginalized Women',
      titleHi: 'उत्तर प्रदेश में विधवा पेंशन योजना: उपेक्षित महिलाओं के लिए जीवनरेखा',
      summary: 'Learn how widowed women in Uttar Pradesh can benefit from the Widow Pension Scheme run by the government.',
      summaryHi: 'जानिए कैसे उत्तर प्रदेश में विधवा महिलाएं सरकारी विधवा पेंशन योजना का लाभ उठा सकती हैं।',
      content: `The Widow Pension Scheme in Uttar Pradesh is a vital government initiative aimed at supporting women who have lost their husbands and are left without a stable source of income. Implemented under the National Social Assistance Programme (NSAP), this scheme ensures that widows receive a monthly pension to help them meet their basic needs.
  
  Eligible applicants must be between 18 and 60 years of age, belong to a Below Poverty Line (BPL) household, and must not be availing other pensions. Required documents include the husband's death certificate, applicant's Aadhaar card, income proof, and a bank passbook for direct benefit transfer.
  
  Applications can be submitted online through the official UP government portal [sspy-up.gov.in](http://sspy-up.gov.in) or via Common Service Centers (CSCs). Once verified by the Gram Panchayat or Nagar Palika and approved by the Block office, the pension amount of Rs. 500 is transferred monthly to the beneficiary's bank account.
  
  This financial support helps reduce the dependency of widowed women on their families, enabling them to live with dignity. The government is continuously working to digitize and simplify the process, ensuring timely payments and transparency.
  
  Widows are encouraged to keep all documents updated and track their application status online. With this support, many women have been able to stand on their feet, pursue small livelihoods, and support their children's education.`,
      contentHi: `उत्तर प्रदेश में विधवा पेंशन योजना एक महत्वपूर्ण सरकारी पहल है, जिसका उद्देश्य उन महिलाओं को सहायता प्रदान करना है जिन्होंने अपने पति को खो दिया है और जिनके पास स्थिर आय का कोई स्रोत नहीं है। यह योजना राष्ट्रीय सामाजिक सहायता कार्यक्रम (NSAP) के अंतर्गत चलाई जाती है और विधवाओं को मासिक पेंशन प्रदान करती है जिससे वे अपनी बुनियादी आवश्यकताओं को पूरा कर सकें।
  
  इस योजना के लिए पात्रता प्राप्त करने के लिए आवेदक की आयु 18 से 60 वर्ष के बीच होनी चाहिए और वह बीपीएल परिवार से होनी चाहिए। साथ ही किसी अन्य सरकारी पेंशन योजना का लाभ नहीं लिया जा रहा होना चाहिए। आवश्यक दस्तावेजों में पति का मृत्यु प्रमाण पत्र, आधार कार्ड, आय प्रमाण पत्र और बैंक पासबुक शामिल हैं।
  
  आवेदन [sspy-up.gov.in](http://sspy-up.gov.in) पोर्टल या नजदीकी कॉमन सर्विस सेंटर (CSC) के माध्यम से किया जा सकता है। ग्राम पंचायत या नगर पालिका द्वारा सत्यापन के बाद और खंड कार्यालय द्वारा अनुमोदन के बाद, 500 रुपये की मासिक पेंशन लाभार्थी के बैंक खाते में सीधे ट्रांसफर की जाती है।
  
  यह आर्थिक सहायता विधवाओं को आत्मनिर्भर बनने और सम्मान के साथ जीवन जीने की दिशा में एक कदम है। सरकार प्रक्रिया को डिजिटल और पारदर्शी बनाकर समय पर भुगतान सुनिश्चित कर रही है।
  
  विधवाओं को सलाह दी जाती है कि वे अपने सभी दस्तावेजों को अद्यतन रखें और आवेदन की स्थिति ऑनलाइन ट्रैक करें। इस योजना के माध्यम से कई महिलाएं छोटे व्यवसाय शुरू कर चुकी हैं और अपने बच्चों की शिक्षा में सहयोग कर पा रही हैं।`,
      author: 'Ayush Tiwari',
      authorHi: 'Ayush Tiwari',
      date: '2025-04-20',
      category: 'Pension',
      categoryHi: 'पेंशन',
      image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Widow', 'Pension', 'UP Government'],
      tagsHi: ['विधवा', 'पेंशन', 'उत्तर प्रदेश']
    },
    {
      id: 5,
      title: 'How to Apply for a Caste Certificate in Uttar Pradesh',
      titleHi: 'उत्तर प्रदेश में जाति प्रमाण पत्र के लिए आवेदन कैसे करें',
      summary: 'A step-by-step guide to applying for a caste certificate online and offline in UP.',
      summaryHi: 'उत्तर प्रदेश में जाति प्रमाण पत्र के लिए ऑनलाइन और ऑफलाइन आवेदन करने की चरण-दर-चरण मार्गदर्शिका।',
      content: 'Detailed 500-word English content here...',
      contentHi: 'यहाँ हिंदी में 500 शब्दों की पूरी सामग्री जाएगी...',
      author: 'Aarti Sharma',
      authorHi: 'आरती शर्मा',
      date: '2025-04-20',
      category: 'Certificates',
      categoryHi: 'प्रमाणपत्र',
      image: 'https://images.unsplash.com/photo-1581090700227-1e37b1904181?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Caste', 'Certificate', 'UP'],
      tagsHi: ['जाति', 'प्रमाण पत्र', 'उत्तर प्रदेश']
    },
    {
      id: 6,
      title: 'Indira Gandhi Widow Pension Scheme in UP: Process & Benefits',
      titleHi: 'उत्तर प्रदेश में इंदिरा गांधी विधवा पेंशन योजना: प्रक्रिया और लाभ',
      summary: 'Details on how widows in Uttar Pradesh can apply for the central pension scheme under NSAP.',
      summaryHi: 'उत्तर प्रदेश में महिलाएं इस राष्ट्रीय विधवा पेंशन योजना के लिए कैसे आवेदन कर सकती हैं, इसकी जानकारी।',
      content: 'Detailed 500-word English content here...',
      contentHi: 'यहाँ हिंदी में 500 शब्दों की पूरी सामग्री जाएगी...',
      author: 'Sudhir Patel',
      authorHi: 'सुधीर पटेल',
      date: '2025-04-20',
      category: 'Pension',
      categoryHi: 'पेंशन',
      image: 'https://images.unsplash.com/photo-1613212132709-29c48d0c73c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Indira Gandhi', 'Widow Pension', 'NSAP'],
      tagsHi: ['इंदिरा गांधी', 'विधवा पेंशन', 'योजना']
    },
    {
      id: 7,
      title: 'Benefits of Caste Certificate for Jobs & Education in UP',
      titleHi: 'उत्तर प्रदेश में नौकरी और शिक्षा के लिए जाति प्रमाण पत्र के लाभ',
      summary: 'Understand how SC/ST/OBC certificates open access to reserved opportunities in education and employment.',
      summaryHi: 'जानिए कैसे जाति प्रमाण पत्र आरक्षित अवसरों का लाभ दिलाते हैं।',
      content: 'Detailed 500-word English content here...',
      contentHi: 'यहाँ हिंदी में 500 शब्दों की पूरी सामग्री जाएगी...',
      author: 'Priya Singh',
      authorHi: 'प्रिया सिंह',
      date: '2025-04-20',
      category: 'Certificates',
      categoryHi: 'प्रमाणपत्र',
      image: 'https://images.unsplash.com/photo-1617862432906-d44d28c15f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Reservation', 'Jobs', 'Education'],
      tagsHi: ['आरक्षण', 'नौकरी', 'शिक्षा']
    },
    {
      id: 8,
      title: 'Common Mistakes in Widow Pension Applications (UP Focus)',
      titleHi: 'विधवा पेंशन आवेदन में आम गलतियाँ (उत्तर प्रदेश विशेष)',
      summary: 'Avoid common errors and ensure your widow pension application gets approved on time.',
      summaryHi: 'सामान्य गलतियों से बचें और सुनिश्चित करें कि आपका पेंशन आवेदन समय पर स्वीकृत हो।',
      content: 'Detailed 500-word English content here...',
      contentHi: 'यहाँ हिंदी में 500 शब्दों की पूरी सामग्री जाएगी...',
      author: 'Amit Verma',
      authorHi: 'अमित वर्मा',
      date: '2025-04-20',
      category: 'Pension',
      categoryHi: 'पेंशन',
      image: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Application', 'Mistakes', 'Widow'],
      tagsHi: ['आवेदन', 'गलतियाँ', 'विधवा']
    },
    {
      id: 9,
      title: 'Digital Centers Empowering Widows in Rural Uttar Pradesh',
      titleHi: 'ग्रामीण उत्तर प्रदेश में विधवाओं को सशक्त बना रहे डिजिटल केंद्र',
      summary: 'Learn how Sarthak Centers and CSCs are helping women avail pensions and services easily.',
      summaryHi: 'जानें कैसे सार्थक केंद्र और CSC महिलाओं को पेंशन और सरकारी सेवाएं लेने में मदद कर रहे हैं।',
      content: 'Detailed 500-word English content here...',
      contentHi: 'यहाँ हिंदी में 500 शब्दों की पूरी सामग्री जाएगी...',
      author: 'Rajesh Kumar',
      authorHi: 'राजेश कुमार',
      date: '2025-04-20',
      category: 'Digital',
      categoryHi: 'डिजिटल',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Digital India', 'CSC', 'Widows'],
      tagsHi: ['डिजिटल इंडिया', 'सीएससी', 'विधवा']
    },
    {
      id: 10,
      title: 'Combining Widow Pension with Ration & Ujjwala Yojana in UP',
      titleHi: 'उत्तर प्रदेश में विधवा पेंशन के साथ राशन और उज्ज्वला योजना का लाभ',
      summary: 'Discover how women can benefit from combining multiple government schemes for maximum support.',
      summaryHi: 'जानें कि महिलाएं कई सरकारी योजनाओं का समन्वय करके अधिक लाभ कैसे ले सकती हैं।',
      content: 'Detailed 500-word English content here...',
      contentHi: 'यहाँ हिंदी में 500 शब्दों की पूरी सामग्री जाएगी...',
      author: 'Neha Gupta',
      authorHi: 'नेहा गुप्ता',
      date: '2025-04-20',
      category: 'Welfare',
      categoryHi: 'कल्याण',
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      tags: ['Widow', 'Ration', 'Ujjwala'],
      tagsHi: ['विधवा', 'राशन', 'उज्ज्वला']
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
      comment: 'The service I received at Sarthak Digital Seva was exceptional. They helped me get my Aadhaar updated in just one visit!',
      commentHi: 'सार्थक डिजिटल सेवा पर मुझे मिली सेवा असाधारण थी। उन्होंने मुझे सिर्फ एक यात्रा में मेरा आधार अपडेट करवाने में मदद की!',
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