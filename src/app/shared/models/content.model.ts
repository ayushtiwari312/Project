export interface ServiceItem {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  icon: string;
  category: string;
  categoryHi: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  titleHi: string;
  summary: string;
  summaryHi: string;
  content: string;
  contentHi: string;
  author: string;
  authorHi: string;
  date: string;
  category: string;
  categoryHi: string;
  image: string;
  tags: string[];
  tagsHi: string[];
}

export interface TeamMember {
  id: number;
  name: string;
  nameHi: string;
  role: string;
  roleHi: string;
  bio: string;
  bioHi: string;
  image: string;
}

export interface Testimonial {
  id: number;
  name: string;
  nameHi: string;
  role: string;
  roleHi: string;
  comment: string;
  commentHi: string;
  image: string;
  rating: number;
}

export interface GalleryItem {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  image: string;
  category: string;
  categoryHi: string;
  date: string;
}