import { Routes } from '@angular/router';
import { CreaterSectionComponent } from './creater-section/creater-section.component';
import { NewsListComponent, NewsCreateComponent, Dashboard, CreatorComponent, PagesListComponent, PageEditorComponent, DocumentsComponent } from './pages';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'news', component: NewsListComponent },
  { path: 'news/create', component: NewsCreateComponent },
  { path: 'pages/create', component: CreatorComponent },
  { path: 'pages', component: PagesListComponent },
  { path: 'page-edit/:page', component: PageEditorComponent },
  { path: 'documents', component: DocumentsComponent },
  // Agar kerak bo'lsa, noma'lum URL uchun fallback route:
  { path: '**', redirectTo: '' }
];
