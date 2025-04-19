import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Sudhir Jan Seva Kendra - Home'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sudhir Jan Seva Kendra - About Us'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Sudhir Jan Seva Kendra - Our Services'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Sudhir Jan Seva Kendra - Contact Us'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),
    title: 'Sudhir Jan Seva Kendra - Blog'
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./pages/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
    title: 'Sudhir Jan Seva Kendra - Blog Article'
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Sudhir Jan Seva Kendra - Gallery'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];