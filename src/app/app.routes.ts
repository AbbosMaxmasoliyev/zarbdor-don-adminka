import { Routes } from '@angular/router';
import { CreaterSectionComponent } from './creater-section/creater-section.component';
import { NewsListComponent, NewsCreateComponent, Dashboard } from './pages';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'news', component: NewsListComponent },
  { path: 'news/create', component: NewsCreateComponent },
  // Agar kerak bo'lsa, noma'lum URL uchun fallback route:
  { path: '**', redirectTo: '' }
];
