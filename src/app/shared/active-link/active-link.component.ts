import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-link',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  templateUrl: './active-link.component.html',
  styleUrls: ['./active-link.component.scss']
})
export class ActiveLinkComponent {
  readonly link = input<string | any[]>('/');
  readonly label = input<string>('');
  readonly activeClass = input<string>('active');
  readonly icon = input<string>('');
  readonly className = input<string>('');
}
