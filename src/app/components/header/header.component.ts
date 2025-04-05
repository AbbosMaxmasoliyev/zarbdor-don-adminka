import { MenuService } from './../../service/menu.shared';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from '../input/input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, InputComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public menuService: MenuService){}
  notifications = 2;
  messages = 2;
  userName = 'Jay Hargudson';
  userRole = 'Manager';
}
