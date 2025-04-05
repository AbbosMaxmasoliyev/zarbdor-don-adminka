import { MultiSelectModule } from 'primeng/multiselect';
import { Component, ElementRef, Input, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface OptionType {
  label: string;
  value: string;
}

@Component({
  imports: [MultiSelectModule, ReactiveFormsModule, CommonModule],
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrl: "./multiselect.component.scss"
})
export class MultiSelectComponent {
  selectContainer = viewChild<ElementRef<HTMLDivElement>>('selectContainer');
  select = viewChild<ElementRef<HTMLSelectElement>>('select');

  @Input() label: string = '';
  @Input() placeholder: string = 'Tanlang';
  @Input() control!: FormControl;
  @Input() options: OptionType[] = [];
  @Input() maxSelectedLabels: number = 3;
  @Input() required: boolean = false;
  @Input() error: string = '';


  onFocus(): void {
    this.selectContainer()?.nativeElement.classList.add('focused');
  }
  focusSelect() {
    this.select()?.nativeElement.focus(); // Select ga fokus berish
  }
  onBlur(): void {
    this.selectContainer()?.nativeElement.classList.remove('focused');
  }
}
