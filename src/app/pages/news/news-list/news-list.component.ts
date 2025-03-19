import { MatIconModule } from '@angular/material/icon';
import { INews } from './../../../types/backend/news.type';
import { Component, computed, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NewsStore } from '../../../store/news.store';
import { IResponse } from '../../../types/backend/response.type';
import { environment } from "../../../../environments/environment.development"
@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [RouterLink, CommonModule, DatePipe, MatIconModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss'
})
export class NewsListComponent implements OnInit {
  today: Date = new Date();
  newsStore = inject(NewsStore);
  apiUrl = environment.apiUrl
  // ✅ To‘g‘ri Signal bog'lash
  newsList: WritableSignal<INews[] | null> = signal(null);

  ngOnInit(): void {
    this.newsStore.fetchItems(); // Ma'lumotlarni yuklash
    this.newsStore.getItems().subscribe(data => {
      if (data?.data && Array.isArray(data.data)) {
        this.newsList.set(data.data);
      }
    })
  }
}
