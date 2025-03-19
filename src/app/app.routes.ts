import { Routes } from '@angular/router';
import { CreaterSectionComponent } from './creater-section/creater-section.component';
import { NewsListComponent, NewsCreateComponent } from './pages';

export const routes: Routes = [
  { path: 'news', component: NewsListComponent },
  { path: 'news/create', component: NewsCreateComponent },
  { path: 'dashboard', component: CreaterSectionComponent },
  // Agar kerak bo'lsa, noma'lum URL uchun fallback route:
  { path: '**', redirectTo: '' }
];
