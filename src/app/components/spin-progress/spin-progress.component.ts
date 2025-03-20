import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexResponsive,
  ApexPlotOptions,
  ApexStroke,
  ApexGrid,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexTooltip,
  NgApexchartsModule,
  ChartType
} from "ng-apexcharts";

@Component({
  selector: 'app-spinners',
  imports: [NgApexchartsModule],
  templateUrl: './spin-progress.component.html',
  styleUrls: ['./spin-progress.component.scss']
})
export class Spinners {
  isDarkMode = false; // Kun rejimi uchun default false

  // Global ApexCharts sozlamalari
  globalOptions = {
    chart: {
      foreColor: this.isDarkMode ? '#ccc' : '#000',
      toolbar: { show: false },
    },
    stroke: { width: 3 },
    dataLabels: { enabled: false },
    tooltip: { theme: this.isDarkMode ? 'dark' : 'light' },
    grid: {
      borderColor: this.isDarkMode ? "#535A6C" : "#E5E7EB",
      xaxis: { lines: { show: true } }
    }
  };

  // Sparkline Charts
  sparkChart(seriesData: number[], color: string): any {
    return {
      chart: {
        type: 'line',
        height: 80,
        sparkline: { enabled: true },
        dropShadow: { enabled: true, top: 1, left: 1, blur: 2, opacity: 0.5 }
      },
      series: [{ data: seriesData }],
      stroke: { curve: 'smooth' },
      markers: { size: 0 },
      grid: { padding: { top: 20, bottom: 10, left: 110 } },
      colors: [color],
      tooltip: {
        x: { show: false },
        y: { title: { formatter: () => '' } }
      }
    };
  }

  spark1 = this.sparkChart([25, 66, 41, 59, 25, 44, 12, 36, 9, 21], '#ff4560');
  spark2 = this.sparkChart([12, 14, 2, 47, 32, 44, 14, 55, 41, 69], '#00e396');
  spark3 = this.sparkChart([47, 45, 74, 32, 56, 31, 44, 33, 45, 19], '#feb019');
  spark4 = this.sparkChart([15, 75, 47, 65, 14, 32, 19, 54, 44, 61], '#008ffb');

  // Radial Chart
  radialChartOptions = {
    chart: {
      type: "radialBar" as ChartType,
      height: 350
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '50%' },
        track: { background: this.isDarkMode ? '#535A6C' : '#E5E7EB' },
        startAngle: -90,
        endAngle: 90,
        stroke: { lineCap: 'round' }
      }
    },
    series: [75.55],
    labels: ['Progress']
  };

  // Switch Theme
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.globalOptions.chart.foreColor = this.isDarkMode ? '#ccc' : '#000';
    this.globalOptions.tooltip.theme = this.isDarkMode ? 'dark' : 'light';
    this.globalOptions.grid.borderColor = this.isDarkMode ? "#535A6C" : "#E5E7EB";
    this.radialChartOptions.plotOptions.radialBar.track.background = this.isDarkMode ? '#535A6C' : '#E5E7EB';
  }
}
