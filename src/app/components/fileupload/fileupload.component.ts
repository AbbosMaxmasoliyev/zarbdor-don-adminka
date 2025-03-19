import { Component, Input, signal, OnChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';  // PrimeNG fayl yuklash komponenti
import { ToastModule } from 'primeng/toast'; // Xabarlarni ko'rsatish
import { CommonModule } from '@angular/common'; // CommonModule (Angular kerakli komponentlar uchun)

@Component({
  selector: 'app-file-upload',
  templateUrl: './fileupload.component.html',
  providers: [MessageService],
  standalone: true,
  imports: [ReactiveFormsModule, FileUpload, ToastModule, CommonModule] // Kerakli modullar
})
export class FileUploadComponent implements OnChanges {
  @Input() control!: FormControl<File[] | null>; // FormControl orqali fayllarni saqlash
  picture: File | null = null;
  pictureUrl: string | null = null;
  @Input() label!: string;
  @Input() required: boolean = false;
  @Input() errorControl: string = "";

  error = signal('');

  ngOnChanges(): void {
    if (this.errorControl) {
      this.error.set(this.errorControl);
    }
  }

  constructor(private messageService: MessageService) { }

  onUpload(event: any) {
    console.log(this.control.value)
    const uploadedFiles: File[] = event.files;
    this.picture = uploadedFiles[0];

    if (this.picture) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pictureUrl = e.target.result; // Faylni Base64 URL sifatida o‘qib oladi
      };
      reader.readAsDataURL(this.picture);
    }

    if (this.control) {
      this.control.setValue(uploadedFiles); // `control` ning qiymatini fayllar bilan yangilash
    }
    console.log(this.control.setValue([this.picture]))

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Files successfully uploaded!'
    });
  }
}
