import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from "../../shared/badge/badge.component";

@Component({
  selector: 'app-header',
  imports: [MatIconModule, InputComponent, CommonModule, BadgeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  notifications = 2;
  messages = 2;
  userName = 'Jay Hargudson';
  userRole = 'Manager';
}
