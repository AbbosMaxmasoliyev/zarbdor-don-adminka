import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '../types/backend/response.type';
import { INews } from '../types/backend/news.type';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class NewsService {
  httpClient = inject(HttpClient);
  newsUrl = environment.apiUrl + 'api/news/'

  create(formValue: FormData) {
    return this.httpClient.post<IResponse<INews>>(
      this.newsUrl,
      formValue,
      {
        headers: new HttpHeaders({
          'Accept': 'text/plain', // ✅ `Content-Type` avtomatik `` bo‘ladi
        })
      }
    );
  }
  getAllAndSearch(searchTerm: string = ''): Observable<IResponse<INews[]>> {
    return this.httpClient.get<IResponse<INews[]>>(`${this.newsUrl}?search=${searchTerm}`);
  }

  getById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.newsUrl}/${id}`);
  }

  update(id: string, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.newsUrl}/${id}`, data);
  }

  deleteById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.newsUrl}/${id}`);
  }


}
