import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: 'Browser market shares in May, 2020',
      align: 'left',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        type: 'pie',
        data: [
          {
            name: 'test',
            y: 5,
          },
          {
            name: 'test2',
            y: 51,
          },
        ],
      },
    ],
  };

  ngOnInit(): void {
    console.log(this.data.t);
    this.chartOptions.series = [
      {
        type: 'pie',
        data: this.data.t,
      },
    ];
    this.chartOptions.title = { text: 'lol' };
  }
}
