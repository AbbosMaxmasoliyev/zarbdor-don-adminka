import { CommonModule } from '@angular/common';
import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<img *ngIf="this.icon" [src]='"assets/icons/"+this.icon+".svg"' alt="{{ icon }} icon">`,
  imports: [CommonModule],
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnChanges {
  @Input() icon!: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.loadIcon();
    }
  }

  private loadIcon(): void {

  }
}
