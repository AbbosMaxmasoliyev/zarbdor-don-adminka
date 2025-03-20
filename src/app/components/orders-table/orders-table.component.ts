import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orders-table',
  imports: [CommonModule, MatIconModule],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {
  orders = [
    { product: 'Handmade Pouch', customer: 'John Bushmill', email: 'Johnb@mail.com', total: '$121.00', status: 'Processing' },
    { product: 'Smartwatch E2', customer: 'Ilham Budi Agung', email: 'ilhambudi@mail.com', total: '$590.00', status: 'Processing' },
    { product: 'Smartwatch E1', customer: 'Mohammad Karim', email: 'm_karim@mail.com', total: '$125.00', status: 'Shipped' },
    { product: 'Headphone G1 Pro', customer: 'Linda Blair', email: 'lindablair@mail.com', total: '$348.00', status: 'Shipped' },
    { product: 'Iphone X', customer: 'Josh Adam', email: 'josh_adam@mail.com', total: '$607.00', status: 'Delivered' }
  ];
}
