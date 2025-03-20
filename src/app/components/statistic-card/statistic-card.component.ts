import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-card',
  imports:[CommonModule],
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.css']
})
export class StatisticCardComponent {
  title = input<string>("");
  value = input<string>("");
  change = input<string>("");
  bgColor = input<string>("");
  icon = input<string>("");
}
