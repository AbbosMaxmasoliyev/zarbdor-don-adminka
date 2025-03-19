import { PRIME_NG_CONFIG } from 'primeng/config';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'donargos_adminka';
}
