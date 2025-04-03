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

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  standalone: true,
  providers: [MessageService],
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, FileUploadComponent, InputComponent, SelectComponent, InputComponent]
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
      title: new FormControl(this.data!.title || '', [Validators.required, Validators.minLength(3)]),
      document: new FormControl<any | string>(environment.apiUrl + this.data!.document || null, [Validators.required]),
      thumbnail: new FormControl<any | string>(environment.apiUrl + this.data!.thumbnail || null, [Validators.required]),
      type: new FormControl(this.data!.type || "", [Validators.required]),
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
    console.log(this.documentForm.controls);

    if (this.documentForm.invalid) {
      console.log("Form xatoliklar mavjud, iltimos, to‘g‘ri to‘ldiring.");
      return;
    }

    let formData = new FormData();
    formData.append('title', this.documentForm.value.title);
    formData.append('type', this.documentForm.value.type);
    console.log(this.documentForm.value.contents)

    const thumbnailImage = this.documentForm.get('thumbnail')!.value;
    const documentFile = this.documentForm.get('document')!.value;

    if (thumbnailImage[0]) {
      formData.append('thumbnail', thumbnailImage[0]); // Faylni FormData'ga qo'shish
    }
    if (documentFile[0]) {
      formData.append('document', documentFile[0]); // Faylni FormData'ga qo'shish
    }
    this.documentService.create(formData).subscribe(data => {
      // this.messageService.add({ severity: 'success', summary: 'Muvaffaqqiyatli', detail: 'Hujjat muvaffaqqiyatli yaratildi!', life: 3000 });
    })

    // if (this.data?._id) {
    //   this.documentService.update(this.data._id, this.documentForm.value).subscribe(() => {
    //     this.dialogRef.close();
    //   });
    // } else {
    //   this.documentService.create(this.documentForm.value).subscribe(() => {
    //     this.dialogRef.close();
    //   });
    // }
  }
}
