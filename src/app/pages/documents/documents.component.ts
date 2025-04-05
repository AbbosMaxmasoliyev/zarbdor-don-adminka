import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DocumentFormComponent } from './document-form/document-form.component';
import { DocumentStore } from '../../store/documents.store';
import { IDocument } from '../../types/backend/document.type';
import { AsyncPipe, NgIf, NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    AsyncPipe,
    NgIf,
    NgForOf,
    MatIconModule
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private store = inject(DocumentStore);
  api = environment.apiUrl
  items = this.store.getItems();
  documents: IDocument[] | [] = [];
  loading = this.store.isLoading();
  error = this.store.getError();

  ngOnInit(): void {
    this.store.fetchItems();
    this.items!.subscribe(data => this.documents = data?.data || data?.data || [])

  }



  openModal(document?: IDocument) {
    const dialogRef = this.dialog.open(DocumentFormComponent, {
      data: document || null,
      panelClass: 'rounded-sm',
    });

    dialogRef.afterClosed().subscribe(() => this.store.fetchItems());
  }

  delete(docId: string) {
    this.store.deleteItem(docId);
  }
}
