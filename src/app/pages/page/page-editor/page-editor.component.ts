import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../../service/page.service';
import { DocumentService } from '../../../service/document.service';
import { MessageService } from 'primeng/api';
import { MatIconModule } from '@angular/material/icon';
import { OptionType, SelectComponent } from '../../../components/select/select.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { MultiSelectComponent } from '../../../components/multiselect/multiselect.component';
import { EditorComponent } from '../../../components/editor/editor.component';
import { Toast } from 'primeng/toast';
import { TextareaComponent } from '../../../components/textarea/textarea.component';

@Component({
  selector: 'app-page-editor',
  imports: [InputComponent, EditorComponent, MultiSelectComponent, CommonModule, MatIconModule, ReactiveFormsModule, SelectComponent, Toast, TextareaComponent],
  templateUrl: './page-editor.component.html',
  providers: [MessageService],
  standalone: true
})
export class PageEditorComponent implements OnInit {
  pageForm!: FormGroup;

  languages: { [key: string]: boolean } = { uz: true };
  languageFor: string[] = Object.keys(this.languages);
  availableLanguages: string[] = ['ru', 'en', 'ko'];
  languageForTranslatation: Record<string, string> = {
    uz: "O'zbek",
    ru: 'Rus',
    en: 'Ingliz',
    ko: 'Koreys'
  };

  options: OptionType[] = [
    {
      "value": "bosh-sahifa",
      "label": "Bosh sahifa"
    },
    {
      "value": "jamiyat",
      "label": "Jamiyat"
    },
    {
      "value": "jamiyat-haqida",
      "label": "Jamiyat haqida"
    },
    {
      "value": "ish-grafigi",
      "label": "Ish grafigi"
    },
    {
      "value": "guvohnoma-va-sertifikatlar",
      "label": "Guvohnoma va sertifikatlar"
    },
    {
      "value": "bank-rekvizitlari",
      "label": "Bank rekvizitlari"
    },
    {
      "value": "zarbdor-elevatori-aj-predmeti-va-maqsadi",
      "label": "ZARBDOR ELEVATORI\" AJ predmeti va maqsadi"
    },
    {
      "value": "tashkiliy-tuzilma",
      "label": "Tashkiliy tuzilma"
    },
    {
      "value": "kuzatuv-kengashi",
      "label": "Kuzatuv kengashi"
    },
    {
      "value": "boshqaruv",
      "label": "Boshqaruv"
    },
    {
      "value": "taftish-komissiyasi",
      "label": "Taftish komissiyasi"
    },
    {
      "value": "shoba-va-tobe-xojalik-jamiyatlari",
      "label": "Sho'ba va tobe xo'jalik jamiyatlari"
    },
    {
      "value": "aksiyador-va-investorlarga",
      "label": "Aksiyador va investorlarga"
    },
    {
      "value": "guvohnoma",
      "label": "Guvohnoma"
    },
    {
      "value": "korporativ-hujjatlar",
      "label": "Korporativ hujjatlar"
    },
    {
      "value": "kapital-tuzilmasi",
      "label": "Kapital tuzilmasi"
    },
    {
      "value": "affillangan-shaxslar",
      "label": "Affillangan shaxslar"
    },
    {
      "value": "aksiyadorlarning-umumiy-yigilish-natijalari",
      "label": "Aksiyadorlarning umumiy yig'ilish natijalari"
    },
    {
      "value": "rivojlanish-strategiyasi",
      "label": "Rivojlanish strategiyasi"
    },
    {
      "value": "biznes-rejalar",
      "label": "Biznes rejalar"
    },
    {
      "value": "muhim-faktlar",
      "label": "Muhim faktlar"
    },
    {
      "value": "hisobotlar",
      "label": "Hisobotlar"
    },
    {
      "value": "asosiy-korsatkichlar",
      "label": "Asosiy ko'rsatkichlar"
    },
    {
      "value": "auditorlik-xulosalari",
      "label": "Auditorlik xulosalari"
    },
    {
      "value": "divedentlar",
      "label": "Divedentlar"
    },
    {
      "value": "matbuot-markazi",
      "label": "Matbuot markazi"
    },
    {
      "value": "yangiliklar",
      "label": "Yangiliklar"
    },
    {
      "value": "sayt-xaritasi",
      "label": "Sayt xaritasi"
    },
    {
      "value": "pochta",
      "label": "Pochta"
    },
    {
      "value": "bosh-ish-orinlari",
      "label": "Bo'sh ish o'rinlari"
    }
  ]

  documentOptions: { label: string; value: string }[] = [];

  slug: string = '';

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private documentService: DocumentService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('page') || '';

    this.pageForm = new FormGroup({
      page: new FormControl('', [Validators.required]),
      type: new FormControl('', Validators.required),
      contents: new FormGroup({}),
      documents: new FormArray([])
    });

    this.loadDocuments();
    this.loadPageData();
  }

  get contents(): FormGroup {
    return this.pageForm.get('contents') as FormGroup;
  }

  get documentArray(): FormArray {
    return this.pageForm.get('documents') as FormArray;
  }



  removeDocumentGroup(index: number) {
    this.documentArray.removeAt(index);
  }
  addDocumentGroup() {
    this.documentArray.push(
      new FormGroup({
        title: new FormControl(''),
        documentIds: new FormControl([], Validators.required)
      })
    );
  }
  loadDocuments() {
    this.documentService.getAll().subscribe(res => {
      this.documentOptions = res.data.map((d: any) => ({
        label: d.title,
        value: d._id
      }));
    });
  }

  loadPageData() {
    this.pageService.getById(this.slug).subscribe((res: any) => {
      const page = res.data;
      this.pageForm.patchValue({
        page: page.page,
        type: page.type
      });

      if (page.type === 'content') {
        const langs = Object.keys(page.contents || {});
        langs.forEach(lang => {
          this.languages[lang] = true;
          this.languageFor = Object.keys(this.languages);


          this.contents.addControl(
            lang,
            new FormGroup({
              title: new FormControl(page.contents[lang]?.title || '', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(100)
              ]),
              description: new FormControl(page.contents[lang]?.description || '', [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(500)
              ]),
              content: new FormControl(page.contents![lang]?.content || '', [
                Validators.required,
                Validators.minLength(20)
              ])
            })
          );

        });
      }

      if (page.type === 'documents') {
        (page.documents || []).forEach((docGroup: any) => {
          this.documentArray.push(
            new FormGroup({
              title: new FormControl(docGroup.title || ''),
              documentIds: new FormControl(docGroup.documentIds?.map((d: any) => d._id), Validators.required)
            })
          );
        });
      }

      this.updateValidationBasedOnType(page.type);
    });
  }

  updateValidationBasedOnType(type: string) {
    const contentsGroup = this.pageForm.get('contents') as FormGroup;
    const documentsArray = this.pageForm.get('documents') as FormArray;

    if (type === 'content') {
      Object.keys(contentsGroup.controls).forEach(lang => {
        const langGroup = contentsGroup.get(lang) as FormGroup;
        langGroup.get('title')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
        langGroup.get('description')?.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(500)]);
        langGroup.get('content')?.setValidators([Validators.required, Validators.minLength(20)]);
        langGroup.updateValueAndValidity();
      });

      documentsArray.controls.forEach(group => {
        group.get('documentIds')?.clearValidators();
        group.updateValueAndValidity();
      });
    } else if (type === 'documents') {
      Object.keys(contentsGroup.controls).forEach(lang => {
        const langGroup = contentsGroup.get(lang) as FormGroup;
        langGroup.get('title')?.clearValidators();
        langGroup.get('description')?.clearValidators();
        langGroup.get('content')?.clearValidators();
        langGroup.updateValueAndValidity();
      });

      documentsArray.controls.forEach(group => {
        group.get('documentIds')?.setValidators([Validators.required]);
        group.updateValueAndValidity();
      });
    }
  }

  addLanguage(lang: string) {
    if (!this.languages[lang]) {
      this.languages[lang] = true;
      this.languageFor = Object.keys(this.languages);
      this.contents.addControl(
        lang,
        new FormGroup({
          title: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          content: new FormControl('', [Validators.required])
        })
      );
    }
  }

  getFormControl(control: any): FormControl {
    return control as FormControl;
  }

  getFormControlError(path: string): string | null {
    const control = this.pageForm.get(path);
    if (control?.touched && control?.invalid) {
      const errors = control.errors;
      if (errors?.['required']) return 'Maydon to‘ldirilishi shart';
      if (errors?.['minlength']) return `Minimal uzunlik: ${errors!['minlength'].requiredLength}`;
      if (errors?.['maxlength']) return `Maksimal uzunlik: ${errors!['maxlength'].requiredLength}`;
    }
    return null;
  }

  onSubmit() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Xatolik', detail: 'Iltimos, formani to‘ldiring' });
      return;
    }

    const data = this.pageForm.value;
    this.pageService.update(this.slug, data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Saqlandi', detail: 'Sahifa muvaffaqiyatli yangilandi' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xatolik', detail: err.error?.message || 'Xatolik yuz berdi' });
      }
    });
  }
}
