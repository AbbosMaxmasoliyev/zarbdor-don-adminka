import { Component, OnInit, inject, Input } from '@angular/core';
import {
  FormGroup, FormControl, Validators, AbstractControl,
  ValidationErrors, ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../components/input/input.component';
import { EditorComponent } from '../../../components/editor/editor.component';
import { FileUploadComponent } from '../../../components/fileupload/fileupload.component';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent, OptionType } from "../../../components/select/select.component";
import { HttpService } from '../../../service/http.service';
import { NewsService } from '../../../service/news.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { TextareaComponent } from '../../../components/textarea/textarea.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
  standalone: true,
  imports: [
    InputComponent, EditorComponent, FileUploadComponent,
    SelectComponent, TextareaComponent,
    CommonModule, ReactiveFormsModule, MatIconModule, Toast
  ],
  providers: [MessageService]
})
export class NewsUpdateComponent implements OnInit {
  newsId: string = "";
  newsService = inject(NewsService);
  httpService = inject(HttpService);
  messageService = inject(MessageService);
  private route = inject(ActivatedRoute)

  newsForm!: FormGroup;
  existingImageUrl: string | null = null;

  languages: { [key: string]: boolean } = { uz: true };
  languageForTranslatation: Record<string, string> = {
    uz: "O'zbek", ko: "Korea", ru: "Rus", en: "Ingliz tilida"
  };
  availableLanguages: string[] = ['ru', 'en', 'ko'];
  languageFor: string[] = Object.keys(this.languages);

  options: OptionType[] = [
    { label: "Bayramlar", value: "holy" },
    { label: "Mavsum", value: "season" },
    { label: "Export", value: "export" },
    { label: "Hamkorlik", value: "partner" }
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.newsId = params.get('newsId') || "";
      if (this.newsId) {
        this.loadNews();
      }
    });
    this.newsForm = new FormGroup({
      image: new FormControl(null),
      slug: new FormControl('', [Validators.required, this.slugValidator]),
      category: new FormControl('', [Validators.required]),
      contents: new FormGroup({
        uz: new FormGroup({
          title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
          description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
          content: new FormControl('', [Validators.required, Validators.minLength(20)])
        })
      }),
    });


  }

  loadNews(): void {
    this.newsService.getById(this.newsId).subscribe(news => {
      this.languageFor = Object.keys(news.contents);
      this.languages = Object.fromEntries(this.languageFor.map(lang => [lang, true]));

      const contentsGroup = this.newsForm.get('contents') as FormGroup;
      this.languageFor.forEach(lang => {
        console.log(lang)
        contentsGroup.patchValue(news.contents);
        contentsGroup.addControl(lang, this.createLanguageForm(news.contents[lang]));
      });
      console.log(this.languageFor)

      this.newsForm.patchValue({
        slug: news.slug,
        category: news.category
      });

      if (news.imageUrl) {
        this.existingImageUrl = news.imageUrl;
      }
    });
  }
  get contents(): FormGroup {
    return this.newsForm.get('contents') as FormGroup;
  }
  createLanguageForm(data?: any): FormGroup {
    return new FormGroup({
      title: new FormControl(data?.title || '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      description: new FormControl(data?.description || '', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
      content: new FormControl(data?.content || '', [Validators.required, Validators.minLength(20)])
    });
  }

  addLanguage(lang: string): void {
    if (!this.languages[lang]) {
      this.languages[lang] = true;
      this.availableLanguages = this.availableLanguages.filter(l => l !== lang);
      (this.newsForm.get('contents') as FormGroup).addControl(lang, this.createLanguageForm());
      this.languageFor = Object.keys(this.languages);
    }
  }

  onSubmit(): void {
    if (this.newsForm.invalid) {
      this.newsForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    formData.append('slug', this.newsForm.value.slug);
    formData.append('category', this.newsForm.value.category);
    formData.append('contents', JSON.stringify(this.newsForm.value.contents));

    const imageFile = this.newsForm.get('image')?.value;
    if (imageFile?.length > 0) {
      formData.append('image', imageFile[0]);
    }

    this.newsService.update(this.newsId, formData).subscribe({
      next: res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Muvaffaqqiyatli',
          detail: 'Yangilik muvaffaqiyatli yangilandi',
          life: 3000
        });
      },
      error: err => {
        console.error(err);
      }
    });
  }

  slugValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? null : { slug: true };
  }

  getFormControl(control: AbstractControl | null): FormControl {
    return control as FormControl;
  }

  getFormControlError(controlName: string): string | null {
    const control = this.newsForm.get(controlName);
    if (!control || !control.errors || !control.touched) return null;
    if (control.hasError('required')) return 'Ushbu maydon majburiy';
    return null;
  }
}
