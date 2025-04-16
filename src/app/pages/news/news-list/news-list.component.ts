import { NewsService } from './../../../service/news.service';
import { MatIconModule } from '@angular/material/icon';
import { INews } from './../../../types/backend/news.type';
import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsStore } from '../../../store/news.store';
import { IResponse } from '../../../types/backend/response.type';
import { environment } from "../../../../environments/environment.development"
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, MatIconModule, ProgressSpinnerModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
  providers: [MessageService]
})
export class NewsListComponent implements OnInit {
  today: Date = new Date();
  newsStore = inject(NewsStore);
  apiUrl = environment.apiUrl
  newsList: WritableSignal<INews[] | null> = signal(null);
  newsService = inject(NewsService)
  messageService = inject(MessageService)
  deleteNews(newsId: string) {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    this.newsService.deleteById(newsId).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'O\'chirildi',
          detail: "Yangilik muvaffaqqiyatli o'chirildi",
          life: 3000
        });        // Yangilash yoki o‘chirilganni ro‘yxatdan olib tashlash:
        this.newsStore.fetchItems(); // Ma'lumotlarni yuklash
        this.newsStore.getItems().subscribe(data => {
          if (data?.data && Array.isArray(data.data)) {
            this.newsList.set(data.data);
          }
        })
      },
      error: (error) => {
        console.error('Delete failed', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Xatolik yuz berdi',
          detail: "Yangilik o'chirilmadi",
          life: 3000
        });
      }
    });
  }
  ngOnInit(): void {
    this.newsStore.fetchItems(); // Ma'lumotlarni yuklash
    this.newsStore.getItems().subscribe(data => {
      if (data?.data && Array.isArray(data.data)) {
        this.newsList.set(data.data);
      }
    })
  }
}
