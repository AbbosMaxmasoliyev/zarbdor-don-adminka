import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewsService } from '../service/news.service';
import { catchError, finalize } from 'rxjs/operators';
import { INews } from '../types/backend/news.type';
import { IResponse } from '../types/backend/response.type';

@Injectable({
  providedIn: 'root',
})
export class NewsStore {
  private items = new BehaviorSubject<IResponse<INews[]> | null>(null); // ✅ To‘g‘ri tiplash
  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<string | null>(null);

  constructor(private newsService: NewsService) { }

  getItems(): Observable<IResponse<INews[]> | null> {
    return this.items.asObservable();
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getError(): Observable<string | null> {
    return this.error.asObservable();
  }

  fetchItems(searchTerm: string = '') {
    this.loading.next(true);
    this.newsService.getAllAndSearch(searchTerm).pipe(
      finalize(() => this.loading.next(false)),
      catchError((error) => {
        this.error.next(error.message || 'Error fetching data');
        throw error;
      })
    ).subscribe(data => this.items.next(data)); // ✅ To‘g‘ri ishlashi uchun `data` to'g'ri o'rnatildi
  }

  updateItem(id: string, newData: INews) {
    if (!this.items.value) return;

    this.newsService.update(id, newData).subscribe(updatedItem => {
      const updatedItems = this.items.value!.data.map(item =>
        item.slug === id ? updatedItem : item
      );

      this.items.next({ ...this.items.value!, data: updatedItems }); // ✅ To‘g‘ri `IResponse<INews[]>` formatiga moslangan
    }, error => this.error.next(error.message || 'Error updating item'));
  }

  deleteItem(id: string) {
    if (!this.items.value) return;

    this.newsService.deleteById(id).subscribe(() => {
      const filteredItems = this.items.value!.data.filter(item => item.slug !== id);
      this.items.next({ ...this.items.value!, data: filteredItems }); // ✅ To‘g‘ri `IResponse<INews[]>` formatiga moslangan
    }, error => this.error.next(error.message || 'Error deleting item'));
  }
}
