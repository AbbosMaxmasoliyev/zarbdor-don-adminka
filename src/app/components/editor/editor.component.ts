import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges,
  signal
} from '@angular/core';
import { Editor, NgxEditorComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, OnChanges {
  editor!: Editor;

  @Input() content: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() control: FormControl = new FormControl('');
  @Input() errorControl: string = '';

  @ViewChild('editorComponent') editorComponent!: ElementRef<HTMLDivElement>;

  error = signal('');

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorControl'] && this.errorControl) {
      this.error.set(this.errorControl);
    }
  }

  focusEditor() {
    this.editorComponent?.nativeElement.classList.add('focused');
  }

  onBlur() {
    this.editorComponent?.nativeElement.classList.remove('focused');
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
