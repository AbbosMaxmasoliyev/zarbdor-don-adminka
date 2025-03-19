import { Component, OnInit, OnDestroy, input, viewChild, ElementRef, signal } from '@angular/core';
import { Editor, NgxEditorComponent, NgxEditorModule, Toolbar } from 'ngx-editor';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, OnDestroy {
  editor!: Editor;
  label = input<string>("");
  required = input<boolean>(false)
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
  control = input<FormControl>(new FormControl(""));
  editorComponent = viewChild<ElementRef<HTMLDivElement>>('editorComponent'); // `@ViewChild` sintaksisiga o‘xshatib yozildi
  errorControl = input<string>("");

  error = signal('');
  ngOnChanges(): void {
    if (this.errorControl()) {
      this.error.set(this.errorControl());
    }
  }
  focusEditor() {
    this.editorComponent()?.nativeElement.classList.add("focused")
  }

  onBlur() {
    this.editorComponent()?.nativeElement.classList.remove("focused")
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
