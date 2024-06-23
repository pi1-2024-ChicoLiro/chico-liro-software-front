import { Component, Input, OnInit } from "@angular/core";
import { createDateArray } from "../../../utils/create-date-array";
import { defaultChartOptions } from "../../../utils/default-chart-options";
import { ApexOptions } from "../../chart/chart.component";

@Component({
  selector: "vex-widget-large-goal-chart",
  templateUrl: "./widget-large-goal-chart.component.html",
})
export class WidgetLargeGoalChartComponent implements OnInit {
  @Input() total: string;
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
      type: "line",
      height: 300,
      sparkline: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: 4,
    },
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
  });

  constructor() {}

  ngOnInit() {}
}
