import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-badge',
  imports: [MatIconModule, CommonModule,],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  icon = input<string>(""); // Bildirishnoma soni
  notifications = input<number>(0); // Bildirishnoma soni

}
