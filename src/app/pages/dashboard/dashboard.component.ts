import { Component } from '@angular/core';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { OrdersTableComponent } from "../../components/orders-table/orders-table.component";
@Component({
  selector: 'app-dashboard',
  imports: [StatisticCardComponent, OrdersTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class Dashboard {

}
