import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { DocumentService } from '../service/document.service';
import { IDocument } from '../types/backend/document.type';
import { IResponse } from '../types/backend/response.type';

@Injectable({
  providedIn: 'root',
})
export class DocumentStore {
  private items = new BehaviorSubject<IResponse<IDocument[]> | null>(null);
  private loading = new BehaviorSubject<boolean>(false);
  private error = new BehaviorSubject<string | null>(null);

  constructor(private documentService: DocumentService) { }

  getItems(): Observable<IResponse<IDocument[]> | null> {
    return this.items.asObservable();
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  getError(): Observable<string | null> {
    return this.error.asObservable();
  }

  fetchItems() {
    this.loading.next(true);
    this.documentService.getAll().pipe(
      finalize(() => this.loading.next(false)),
      catchError((error) => {
        this.error.next(error.message || 'Hujjatlarni yuklashda xatolik yuz berdi');
        throw error;
      })
    ).subscribe(data => this.items.next(data));
  }

  updateItem(id: string, newData: IDocument) {
    if (!this.items.value) return;

    this.documentService.update(id, newData).subscribe(updatedItem => {
      const updatedItems = this.items.value!.data.map(item =>
        item._id === id ? updatedItem : item
      );
      this.fetchItems()
    }, error => this.error.next(error.message || 'Hujjatni yangilashda xatolik yuz berdi'));
  }

  deleteItem(id: string) {
    if (!this.items.value) return;

    this.documentService.delete(id).subscribe(() => {
      const filteredItems = this.items.value!.data.filter(item => item._id !== id);
      this.items.next({ ...this.items.value!, data: filteredItems });
    }, error => this.error.next(error.message || 'Hujjatni o‘chirishda xatolik yuz berdi'));
  }
}
