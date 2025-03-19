import { Component, ElementRef, forwardRef, input, Input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ReactiveFormsModule, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface OptionType { label: string, value: string }

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, SelectModule],
  templateUrl: "./select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  styleUrl: "./select.component.scss"
})

export class SelectComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() prefix = '';
  @Input() options: OptionType[] | null = null
  @Input() required: boolean = false
  @Input() errorControl: string = ("");


  selectContainer = viewChild<ElementRef<HTMLDivElement>>('selectContainer');
  control = input<FormControl>(new FormControl());
  select = viewChild<ElementRef<HTMLSelectElement>>('select');
  error = signal('');
  ngOnChanges(): void {
    if (this.errorControl) {
      this.error.set(this.errorControl);
    }
  }
  trackByFn(value: string, option: OptionType): string {
    return option.value; // Har bir option uchun ID ni qaytarish
  }
  focusSelect() {
    this.select()?.nativeElement.focus(); // Select ga fokus berish
  }
  onFocus(): void {
    this.selectContainer()?.nativeElement.classList.add('focused');
  }
  onBlur(): void {
    this.selectContainer()?.nativeElement.classList.remove('focused');
  }

}
