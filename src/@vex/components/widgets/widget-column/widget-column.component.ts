import { Component, Input, OnInit } from "@angular/core";
import { defaultChartOptions } from "../../../utils/default-chart-options";
import { ApexOptions } from "../../chart/chart.component";

@Component({
  selector: "vex-widget-column-chart",
  templateUrl: "./widget-column.component.html",
})
export class WidgetColumnChartComponent implements OnInit {
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
      type: "bar",
      height: 384,
      sparkline: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "55%",
        borderRadius: 4,
      },
    },
    stroke: {
      show: true,
      width: 10,
      colors: ["transparent"],
    },
    colors: ["#9c27bd", "#009688", "#ffeb3b", "#3f51b5"],
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    xaxis: {
      labels: {
        show: true,
      },
    },
    tooltip: {
      y: {
        formatter: function (val, opts) {
          const seriesIndex = opts.seriesIndex;
          const seriesName = opts.w.globals.seriesNames[seriesIndex];
          if (seriesName === "Aceleração Média") {
            return val + " m/s²";
          }
          return val + " m/s";
        },
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
