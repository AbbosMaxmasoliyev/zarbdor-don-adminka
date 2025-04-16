import { Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { DocumentService } from '../../../service/document.service';
import { IDocument } from '../../../types/backend/document.type';
import { ButtonModule } from 'primeng/button';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, MatDialogModule, ButtonModule, ToastModule, Toast]
})
export class DeleteModalComponent {
  data: IDocument = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DeleteModalComponent>);
  private messageService = inject(MessageService);
  private documentService = inject(DocumentService);

  confirmDelete(): void {
    let id = this.data._id
    if (!id) return
    this.documentService.delete(id).subscribe({
      next: async () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Muvaffaqiyatli',
          detail: `"${this.data.title}" hujjati o‘chirildi!`,
          life: 3000
        });
        setTimeout(() => {
          this.dialogRef.close('deleted');
        }, 3000)
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Xatolik',
          detail: err?.error?.message || 'O‘chirishda xatolik yuz berdi.',
          life: 3000
        });
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
