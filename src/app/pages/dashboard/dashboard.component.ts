import { Component } from '@angular/core';
import { StatisticCardComponent } from '../../components/statistic-card/statistic-card.component';
import { OrdersTableComponent } from "../../components/orders-table/orders-table.component";
import { PrimeTemplate } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import 'chart.js/auto';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [PrimeTemplate, CardModule, TagModule, ChartModule, ButtonModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class Dashboard {

  orders = [
    {
      product: 'Premium Grain Bundle',
      customer: 'Olimjon Karimov',
      email: 'olimjon@example.com',
      amount: '$120.00',
      status: 'Processing'
    },
    {
      product: 'Organic Wheat 50kg',
      customer: 'Dilnoza Rahimova',
      email: 'dilnoza@example.com',
      amount: '$85.00',
      status: 'Shipped'
    },
    {
      product: 'Corn Feed 25kg',
      customer: 'Sardorbek Alimov',
      email: 'sardor@example.com',
      amount: '$45.00',
      status: 'Delivered'
    },
    {
      product: 'Animal Nutrition Kit',
      customer: 'Malika Tursunova',
      email: 'malika@example.com',
      amount: '$130.00',
      status: 'Processing'
    }
  ];

  chartData = {
    labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul'],
    datasets: [
      {
        label: 'Revenue',
        data: [6500, 5900, 8000, 8100, 5600, 5500, 7000],
        fill: false,
        borderColor: '#6366f1', // indigo-500
        tension: 0.4
      },
      {
        label: 'Expenses',
        data: [4000, 4200, 5000, 4800, 4500, 4900, 5200],
        fill: false,
        borderColor: '#ef4444', // red-500
        tension: 0.4
      }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#6b7280', // gray-500
          font: {
            family: 'Poppins'
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280'
        },
        grid: {
          color: '#e5e7eb' // gray-200
        }
      },
      y: {
        ticks: {
          color: '#6b7280'
        },
        grid: {
          color: '#e5e7eb'
        }
      }
    }
  };

}
