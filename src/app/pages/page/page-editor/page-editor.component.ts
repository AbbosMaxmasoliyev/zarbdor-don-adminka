import { OptionType } from '../../../components/select/select.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
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
import { PagesStore } from '../../../store/pages.store';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  imports: [InputComponent, EditorComponent, CommonModule, MatIconModule, ReactiveFormsModule, SelectComponent, Toast, TextareaComponent],
  styleUrls: ['./page-editor.component.scss'],
  standalone: true,
  providers: [MessageService]

})
export class PageditorComponent implements OnInit {
  pageStore = inject(PagesStore)
  pageService = inject(PageService)
  httpService = inject(HttpService)
  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  languages: { [key: string]: boolean } = { uz: true };
  languageForTranslatation: Record<string, string> = { uz: "O'zbek", ko: "Korea", ru: "Rus", en: "Ingliz tilida" }
  availableLanguages: string[] = ['ru', 'en', 'ko'];
  languageFor: string[] = Object.keys(this.languages);

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

  pageForm!: FormGroup;

  ngOnInit(): void {
    const page = this.route.snapshot.paramMap.get('page');
    console.log(page)
    if (!page) {
      return
    }
    this.pageStore.fetchItemById(page)
    this.pageForm = new FormGroup({
      page: new FormControl('', [Validators.required]),
      contents: new FormGroup({
        uz: new FormGroup({
          title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
          content: new FormControl(``, [Validators.required, Validators.minLength(20)])
        })
      }),
    });

    this.pageStore.getItem().subscribe(response => {
      const page = response?.page;
      if (!page) return;

      this.pageForm.patchValue({
        page: page.page,
        contents: page.contents
      });
    });
  }




  onSubmit(): void {
    console.log(this.pageForm.value)
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      console.log(this.pageForm.touched)
      console.log("Form xatoliklar mavjud, iltimos, to‘g‘ri to‘ldiring.");
      return;
    }


    // Contents obyektini JSON formatida qo'shish


    this.pageService.update(this.pageForm.value.page,this.pageForm.value).subscribe(
      (response) => {
        console.log('Ma\'lumotlar yangilandi:', response);
        this.messageService.add({ severity: 'success', summary: 'Muvaffaqqiyatli', detail: 'Post muvaffaqqiyatli yangilandi!', life: 3000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Muvaffqqiyatsiz', detail: 'Post muvaffaqqiyatli yangilanmadi!', life: 3000 });
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
      (this.pageForm.get('translations') as FormGroup).addControl(lang, this.createLanguageForm());
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
    return this.pageForm.get('contents') as FormGroup;
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  getFormControlError(controlName: string): string | null {
    const control = this.pageForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Ushbu maydon majburiy';
    }
    return null;
  }

}
