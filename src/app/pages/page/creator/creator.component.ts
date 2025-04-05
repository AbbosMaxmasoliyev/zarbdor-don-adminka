import { OptionType } from '../../../components/select/select.component';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormArray } from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { EditorComponent } from '../../../components/editor/editor.component';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../../components/fileupload/fileupload.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent } from "../../../components/select/select.component";
import { HttpService } from '../../../service/http.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TextareaComponent } from '../../../components/textarea/textarea.component';
import { PageService } from '../../../service/page.service';
import { DocumentStore } from '../../../store/documents.store';
import { MultiSelectComponent } from '../../../components/multiselect/multiselect.component';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  imports: [InputComponent, EditorComponent, MultiSelectComponent, CommonModule, MatIconModule, ReactiveFormsModule, SelectComponent, Toast, TextareaComponent],
  styleUrls: ['./creator.component.css'],
  standalone: true,
  providers: [MessageService]

})
export class CreatorComponent implements OnInit {
  service = inject(PageService)
  httpService = inject(HttpService)
  documents = inject(DocumentStore)
  documentOptions: OptionType[] | null = null
  constructor(private messageService: MessageService) { }

  newsForm!: FormGroup;
  languages: { [key: string]: boolean } = { uz: true };
  languageForTranslatation: Record<string, string> = { uz: "O'zbek", ko: "Korea", ru: "Rus", en: "Ingliz tilida" }
  availableLanguages: string[] = ['ru', 'en', 'ko'];
  languageFor: string[] = Object.keys(this.languages);
  pageType = signal<string>("")
  options: OptionType[] = [

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
      "value": "pochta",
      "label": "Pochta"
    },
    {
      "value": "bosh-ish-orinlari",
      "label": "Bo'sh ish o'rinlari"
    }
  ]
  ngOnInit(): void {
    this.documents.fetchItems()
    this.documents.getItems().subscribe(data => {
      console.log(data)
      this.documentOptions = data?.data.length ? data?.data.map(item => {
        return { label: item?.title, value: item._id! }
      }) : null
    })

    this.newsForm = new FormGroup({
      page: new FormControl('', [Validators.required, this.slugValidator]),
      type: new FormControl('documents', [Validators.required]),

      contents: new FormGroup({
        uz: new FormGroup({
          title: new FormControl('', [Validators.minLength(3), Validators.maxLength(100)]),
          description: new FormControl('', [Validators.minLength(10), Validators.maxLength(500)]),
          content: new FormControl('', [Validators.minLength(20)])
        })
      }),

      documents: new FormArray([
        new FormGroup({
          title: new FormControl(''), // optional
          documentIds: new FormControl(['67eb909807da93fb955030ac']) // default selected
        })
      ])
    });

    this.newsForm.get('type')?.valueChanges.subscribe((type) => {
      this.updateValidationBasedOnType(type);
    });
    this.updateValidationBasedOnType(this.newsForm.get('type')?.value);

  }
  messageOpen(): void {
    this.messageService.add({ severity: 'success', summary: 'Muvaffaqqiyatli', detail: 'Post muvaffaqqiyatli yaratildi!', life: 10000 });
    this.newsForm.reset();
  }
  updateValidationBasedOnType(type: string) {
    const contentsGroup = this.newsForm.get('contents') as FormGroup;
    const documentsArray = this.newsForm.get('documents') as FormArray;

    if (type === 'content') {
      // contents required bo‘ladi
      Object.keys(contentsGroup.controls).forEach(lang => {
        const langGroup = contentsGroup.get(lang) as FormGroup;
        langGroup.get('title')?.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(100)]);
        langGroup.get('description')?.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(500)]);
        langGroup.get('content')?.setValidators([Validators.required, Validators.minLength(20)]);
        langGroup.updateValueAndValidity();
      });

      // documents validator olib tashlanadi
      documentsArray.controls.forEach(group => {
        group.get('documentIds')?.clearValidators();
        group.updateValueAndValidity();
      });

    } else if (type === 'documents') {
      // contents validator olib tashlanadi
      Object.keys(contentsGroup.controls).forEach(lang => {
        const langGroup = contentsGroup.get(lang) as FormGroup;
        langGroup.get('title')?.clearValidators();
        langGroup.get('description')?.clearValidators();
        langGroup.get('content')?.clearValidators();
        langGroup.updateValueAndValidity();
      });

      // documents required validator qo‘shiladi
      documentsArray.controls.forEach(group => {
        group.get('documentIds')?.setValidators([Validators.required]);
        group.updateValueAndValidity();
      });
    }
  }

  get documentArray(): FormArray {
    return this.newsForm.get('documents') as FormArray;
  }

  addDocumentGroup() {
    this.documentArray.push(
      new FormGroup({
        title: new FormControl(''),
        documentIds: new FormControl([], Validators.required)
      })
    );
  }

  removeDocumentGroup(index: number) {
    this.documentArray.removeAt(index);
  }


  onSubmit(): void {
    console.log(this.newsForm.value)
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched();
      this.newsForm.setErrors(this.newsForm.errors)
      console.log("Form xatoliklar mavjud, iltimos, to‘g‘ri to‘ldiring.");
      return;
    }


    // Contents obyektini JSON formatida qo'shish


    this.service.create(this.newsForm.value).subscribe(
      (response) => {
        console.log('Ma\'lumotlar muvaffaqiyatli yuborildi:', response);
        this.messageService.add({ severity: 'success', summary: 'Muvaffaqqiyatli', detail: 'Post muvaffaqqiyatli yaratildi!', life: 3000 });
        this.newsForm.reset();
      },
      (error) => {
        console.log('Xatolik yuz berdi:', error);
      }
    );
  }

  createLanguageForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      content: new FormControl('', [Validators.required, Validators.minLength(20)])
    });
  }

  addLanguage(lang: string): void {
    if (!this.languages[lang]) {
      this.languages[lang] = true;
      this.availableLanguages = this.availableLanguages.filter(l => l !== lang);
      (this.newsForm.get('translations') as FormGroup).addControl(lang, this.createLanguageForm());
      this.languageFor = Object.keys(this.languages);
    }
  }

  slugValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
      return { slug: true };
    }
    return null;
  }

  get contents(): FormGroup {
    return this.newsForm.get('contents') as FormGroup;
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  getFormControlError(controlName: string): string | null {
    const control = this.newsForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.hasError('required')) {
      console.log(control.errors)
      return 'Ushbu maydon majburiy';
    }
    return null;
  }

}
