import { environment } from './../../../../environments/environment';
import { MessageService } from 'primeng/api';
import { CommonModule } from "@angular/common";
import { Component, inject, Inject, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { DocumentService } from "../../../service/document.service";
import { IDocument } from "../../../types/backend/document.type";
import { FileUploadComponent } from "../../../components/fileupload/fileupload.component";
import { InputComponent } from "../../../components/input/input.component";
import { OptionType, SelectComponent } from "../../../components/select/select.component";
import { DocumentStore } from "../../../store/documents.store";
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, FileUploadComponent, InputComponent, SelectComponent, InputComponent, Toast]
})
export class DocumentFormComponent implements OnInit {
  documentForm!: FormGroup;
  options: OptionType[] = [
    {
      label: "PDF hujjat",
      value: "pdf"
    }, {
      label: "Excel",
      value: "excel"
    },
    {
      label: "Mavsum",
      value: "word"
    }]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IDocument | null,
    private dialogRef: MatDialogRef<DocumentFormComponent>,
    private messageService: MessageService,
    private documentService: DocumentService,
  ) { }


  ngOnInit(): void {
    this.documentForm = new FormGroup({
      title: new FormControl(this.data?.title || '', [Validators.required, Validators.minLength(3)]),
      document: new FormControl<any | string>(null, [this.data?.document ? Validators.nullValidator : Validators.required]),
      thumbnail: new FormControl<any | string>(null, [this.data?.document ? Validators.nullValidator : Validators.required]),
      type: new FormControl(this.data?.type || "", [Validators.required]),
    });
  }
  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }
  getFormControlError(controlName: string): string | null {
    const control = this.documentForm.get(controlName);
    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Ushbu maydon majburiy';
    }
    return null;
  }
  save() {
    this.documentForm.markAllAsTouched();

    if (this.documentForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Xatolik',
        detail: "Formada xatoliklar mavjud. Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.",
        life: 3000
      });
      return;
    }

    const formData = new FormData();

    const fields = [
      { key: 'title', type: 'string' },
      { key: 'type', type: 'string' },
      { key: 'thumbnail', type: 'object' },
      { key: 'document', type: 'object' }
    ];

    fields.forEach(({ key, type }) => {
      const value = this.documentForm.value[key];

      if (typeof value === type) {
        if (type === 'object' && value?.[0]) {
          formData.append(key, value[0]); // Fayl (thumbnail, document)
        } else {
          formData.append(key, value); // Oddiy matn (title, type)
        }
      }
    });

    // Yaratish
    if (!this.data) {
      this.documentService.create(formData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Muvaffaqiyatli',
            detail: 'Hujjat muvaffaqiyatli yaratildi!',
            life: 3000
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Xatolik',
            detail: err?.error?.message || 'Yaratishda xatolik yuz berdi.',
            life: 3000
          });
        }
      });
    }
    // Yangilash
    else if (this.data._id) {
      this.documentService.update(this.data._id, formData).subscribe({
        next: () => {
          console.log("ishladi")
          this.messageService.add({
            severity: 'success',
            summary: 'Muvaffaqiyatli',
            detail: 'Hujjat muvaffaqiyatli yangilandi!',
            life: 3000
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Xatolik',
            detail: err?.error?.message || 'Yangilashda xatolik yuz berdi.',
            life: 3000
          });
        }
      });
    }
  }

}
