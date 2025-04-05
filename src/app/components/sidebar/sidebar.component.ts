import { Component } from '@angular/core';
import { ActiveLinkComponent } from "../../shared/active-link/active-link.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuService } from '../../service/menu.shared';

@Component({
  selector: 'app-sidebar',
  imports: [ActiveLinkComponent, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public menuServiceForSidebar: MenuService) { }

}
