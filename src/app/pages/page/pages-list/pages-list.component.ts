import { optionsObject } from './../../../types/backend/page.type';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PageService } from '../../../service/page.service';
import { CommonModule } from '@angular/common';
import { PagesStore } from '../../../store/pages.store';
import { environment } from '../../../../environments/environment.development';
import { IPage } from '../../../types/backend/page.type';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-pages-list',
  imports: [RouterLink, CommonModule, MatIconModule, ProgressSpinnerModule, Toast],
  providers: [MessageService],
  templateUrl: './pages-list.component.html',
  styleUrl: './pages-list.component.scss'
})
export class PagesListComponent {
  service = inject(PageService)
  optionsObject = optionsObject
  pageStore = inject(PagesStore);
  apiUrl = environment.apiUrl
  pagesList: WritableSignal<IPage[] | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(false);
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.pageStore.fetchItems(); // Ma'lumotlarni yuklash
    this.pageStore.isLoading().subscribe(data => {
      this.isLoading.set(data)
    })
    this.pageStore.getItems().subscribe(data => {
      if (data?.data && Array.isArray(data.data)) {
        this.pagesList.set(data.data);
      }
    })
  }

  pageDelete(id: string): void {
    this.service.deleteById(id).subscribe(
      (response) => {
        console.log('Ma\'lumotlar muvaffaqiyatli yuborildi:', response);
        this.messageService.add({ severity: 'success', summary: 'Muvaffaqqiyatli', detail: 'Sahifa muvaffaqqiyalti o\'chirildi!', life: 3000 });
        this.pageStore.fetchItems()
      },
      (error) => {
        console.log('Xatolik yuz berdi:', error);
      }
    );
  }


}
