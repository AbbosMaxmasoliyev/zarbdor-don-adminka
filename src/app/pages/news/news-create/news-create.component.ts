import { OptionType } from '../../../components/select/select.component';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { EditorComponent } from '../../../components/editor/editor.component';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from '../../../components/fileupload/fileupload.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent } from "../../../components/select/select.component";
import { HttpService } from '../../../service/http.service';
import { NewsService } from '../../../service/news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  imports: [InputComponent, EditorComponent, CommonModule, FileUploadComponent, MatIconModule, ReactiveFormsModule, SelectComponent],
  styleUrls: ['./news-create.component.css'],
  standalone: true
})
export class NewsCreateComponent implements OnInit {
  newsService = inject(NewsService)
  httpService = inject(HttpService)
  newsForm: any;
  languages: { [key: string]: boolean } = { uz: true };
  languageForTranslatation: Record<string, string> = { uz: "O'zbek", ko: "Korea", ru: "Rus", en: "Ingliz tilida" }
  availableLanguages: string[] = ['ru', 'en', 'ko'];
  languageFor: string[] = Object.keys(this.languages);
  options: OptionType[] = [{
    label: "Bayramlar",
    value: "holy"
  },
  {
    label: "Mavsum",
    value: "season"
  },
  {
    label: "Export",
    value: "export"
  },
  {
    label: "Hamkorlik",
    value: "partner"
  }]
  ngOnInit(): void {
    this.newsForm = new FormGroup({
      image: new FormControl<any>(null, [Validators.required]), // Fayllar massivini kiritish
      slug: new FormControl('salom-slug', [Validators.required, this.slugValidator]),
      category: new FormControl('option1', [Validators.required, this.slugValidator]),
      contents: new FormGroup({
        uz: new FormGroup({
          title: new FormControl('salom bir kun', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          description: new FormControl('salom bir kun', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
          content: new FormControl('salom bir kun', [Validators.required, Validators.minLength(20)])
        })
      }),
    });

  }




  onSubmit(): void {
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched();
      console.log(this.newsForm.touched)
      console.log("Form xatoliklar mavjud, iltimos, to‘g‘ri to‘ldiring.");
      return;
    }
    // FormData obyektini yaratish
    let formData = new FormData();
    formData.append('slug', this.newsForm.value.slug);
    formData.append('category', this.newsForm.value.category);
    formData.append('contents', JSON.stringify(this.newsForm.value.contents)); // contentsni JSON sifatida saqlaymiz
    console.log(this.newsForm.value.contents)
    // Faylni FormData'ga qo'shish
    const uploadedFile = this.newsForm.get('image')!.value;
    console.log(uploadedFile)
    if (uploadedFile[0]) {
      formData.append('image', uploadedFile[0]); // Faylni FormData'ga qo'shish
    }

    // Contents obyektini JSON formatida qo'shish

    this.newsService.create(formData).subscribe(
      (response) => {
        console.log('Ma\'lumotlar muvaffaqiyatli yuborildi:', response);
        // Yuborilganidan so'ng, formni tozalash
        // this.newsForm.reset();
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
      return 'Ushbu maydon majburiy';
    }
    return null;
  }

}
