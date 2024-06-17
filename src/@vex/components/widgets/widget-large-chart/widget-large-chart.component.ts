import { Component, Input, OnInit } from "@angular/core";
import { createDateArray } from "src/@vex/utils/create-date-array";
import { defaultChartOptions } from "../../../utils/default-chart-options";
import { ApexOptions } from "../../chart/chart.component";

@Component({
  selector: "vex-widget-large-chart",
  templateUrl: "./widget-large-chart.component.html",
  styleUrls: ["./widget-large-chart.component.scss"],
})
export class WidgetLargeChartComponent implements OnInit {
  @Input() series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  @Input() options: ApexOptions = defaultChartOptions({
    grid: {
      show: true,
      strokeDashArray: 3,
      padding: {
        left: 16,
      },
    },
    chart: {
      type: "area",
      height: 384,
      sparkline: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 90, 100],
      },
    },
    colors: ["#ff9800", "#2196f3", "#009688", "#e91e63", "#4caf50"],
    labels: createDateArray(12),
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      itemMargin: {
        horizontal: 4,
        vertical: 4,
      },
    },
  });

  constructor() {}

  ngOnInit() {}
}
