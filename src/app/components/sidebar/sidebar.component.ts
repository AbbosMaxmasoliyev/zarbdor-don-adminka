import { Component } from '@angular/core';
import { ActiveLinkComponent } from "../../shared/active-link/active-link.component";

@Component({
  selector: 'app-sidebar',
  imports: [ActiveLinkComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
