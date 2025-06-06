import { Component, ElementRef, forwardRef, input, Input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: "./textarea.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  styleUrl: "./textarea.component.scss"
})
export class TextareaComponent {
  textAreaContainer = viewChild<ElementRef<HTMLDivElement>>('textAreaContainer');
  innerValue = '';
  placeholder = input<string>('');
  label = input<string>('');
  control = input<AbstractControl<any, any> | null>();
  required = input<boolean>(false)
  errorControl = input<string>("");
  icon = input<string>("")

  error = signal('');


  get formControl(): FormControl {
    return this.control() as FormControl;
  }
  ngOnChanges(): void {
    if (this.errorControl()) {
      this.error.set(this.errorControl());
    }
    this.innerValue = this.control()!.value



  }



  onFocus(): void {
    this.textAreaContainer()?.nativeElement.classList.add('focused');
  }

  onBlur(): void {
    this.textAreaContainer()?.nativeElement.classList.remove('focused');
    this.onInputChange(this.innerValue); // Xatolarni tekshirish uchun
  }

  // --------- Custom value accessor logic ---------
  isDisabled: boolean = false;
  onChange(value: string): void {
    const control = this.control();
    if (control) {
      control.setValue(value);
      control.markAsTouched(); // Qo'shimcha: maydon o'zgarganligini bildirish
    }
  }
  onTouched: () => void = () => { };

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInputChange(value: string) {
    this.innerValue = value;
    this.onChange(value);
    this.onTouched();

    const control = this.control();
    if (!control) {
      this.error.set('');
      return;
    }

    console.log(control.errors);

    if (!control.errors) {
      this.error.set('');
      return;
    }

    const firstError = Object.keys(control.errors)[0];

    if (!firstError) {
      this.error.set('');
      return;
    }

    switch (firstError) {
      case 'minlength':
        this.error.set(
          `Belgilar soni ${control.errors[firstError].requiredLength} dan ko‘p bo‘lishi kerak`
        );
        break;

      case 'maxlength':
        this.error.set(
          `Belgilar soni ${control.errors[firstError].requiredLength} dan ko‘p bo‘lishi kerak`
        );
        break;

      case 'slug':
        this.error.set(
          'Ushbu maydon uchun faqat kichik harflar va tire (-) dan foydalanishingiz mumkin'
        );
        break;

      case 'required':
        this.error.set(`Majburiy maydon`);
        break;

      case 'uppercaseLowercase':
        this.error.set(
          'Parolda kamida bitta katta va bitta kichik harf bo‘lishi kerak'
        );
        break;

      case 'usernameInvalid':
        this.error.set(
          'Username faqat harflar va raqamlardan iborat bo‘lishi kerak, maxsus belgilardan foydalanish mumkin emas'
        );
        break;

      default:
        this.error.set('Xato: ' + JSON.stringify(control.errors[firstError]));
    }
  }

}
