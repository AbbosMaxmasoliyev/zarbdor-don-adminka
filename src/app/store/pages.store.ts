import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { IResponse } from '../types/backend/response.type';
import { IPage } from '../types/backend/page.type';
import { PageService } from '../service/page.service';

@Injectable({
  providedIn: 'root',
})
export class PagesStore {
  private items = new BehaviorSubject<IResponse<IPage[]> | null>(null); // ✅ To‘g‘ri tiplash
  private item = new BehaviorSubject<IResponse<IPage> | null>(null); // ✅ To‘g‘ri tiplash
  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<string | null>(null);

  constructor(private pageService: PageService) { }

  getItems(): Observable<IResponse<IPage[]> | null> {
    return this.items.asObservable();
  }
  getItem(): Observable<IResponse<IPage> | null> {
    return this.item.asObservable();
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getError(): Observable<string | null> {
    return this.error.asObservable();
  }

  fetchItemById(page: string = '') {
    this.loading.next(true);
    this.pageService.getById(page).pipe(
      finalize(() => this.loading.next(false)),
      catchError((error) => {
        this.error.next(error.message || 'Error fetching data');
        throw error;
      })
    ).subscribe(data => this.item.next(data));
  }
  fetchItems(searchTerm: string = '') {
    this.loading.next(true);
    this.pageService.getAllAndSearch(searchTerm).pipe(
      finalize(() => setTimeout(()=>{
        this.loading.next(false)
      },3000)),
      catchError((error) => {
        this.error.next(error.message || 'Error fetching data');
        throw error;
      })
    ).subscribe(data => this.items.next(data));
  }

  updateItem(id: string, newData: IPage) {

    this.pageService.update(id, newData).subscribe(updatedItem => {

    }, error => this.error.next(error.message || 'Error updating item'));
  }

  deleteItem(id: string) {
    if (!this.items.value) return;

    this.pageService.deleteById(id).subscribe(() => {
      const filteredItems = this.items.value!.data.filter(item => item.page !== id);
      this.items.next({ ...this.items.value!, data: filteredItems }); // ✅ To‘g‘ri `IResponse<IPage[]>` formatiga moslangan
    }, error => this.error.next(error.message || 'Error deleting item'));
  }
}
