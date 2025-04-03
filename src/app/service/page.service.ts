import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IResponse } from '../types/backend/response.type';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IPage } from '../types/backend/page.type';


@Injectable({ providedIn: 'root' })
export class PageService {
  httpClient = inject(HttpClient);
  pageUrl = environment.apiUrl + 'api/pages/'

  create(formValue: FormData) {
    return this.httpClient.post<IResponse<IPage>>(
      this.pageUrl,
      formValue,
      {
        headers: new HttpHeaders({
          'Accept': 'text/plain', // ✅ `Content-Type` avtomatik `` bo‘ladi
        })
      }
    );
  }
  getAllAndSearch(searchTerm: string = ''): Observable<IResponse<IPage[]>> {
    return this.httpClient.get<IResponse<IPage[]>>(`${this.pageUrl}?search=${searchTerm}`);
  }

  getById(page: string): Observable<any> {
    return this.httpClient.get<any>(`${this.pageUrl}page/${page}`);
  }

  update(page: string, data: any): Observable<IPage> {
    return this.httpClient.put<IPage>(`${this.pageUrl}page/${page}`, data);
  }

  deleteById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.pageUrl}${id}`);
  }


}
