import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { Subscription } from "rxjs";
import { defaultChartOptions } from "../../../@vex/utils/default-chart-options";

@Component({
  selector: "vex-dashboard-analytics",
  templateUrl: "./dashboard-analytics.component.html",
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy {
  constructor(private dialog: MatDialog, private socket: Socket) {}

  private subscriptions = new Subscription();
  velocidadeTempo: ApexAxisChartSeries = [
    // {
    //   name: "Trilha 1",
    //   data: [54, 17, 26],
    // },
    // {
    //   name: "Trilha 2",
    //   data: [21, 29, 12],
    // },
  ];
  velocidadeAceleracao: ApexAxisChartSeries = [
    {
      name: "Aceleração Média",
      data: [
        { x: "Trilha 1", y: 0.65 },
        { x: "Trilha 2", y: 0.45 },
        { x: "Trilha 3", y: 0.8 },
      ],
    },
    {
      name: "Velocidade Média",
      data: [
        { x: "Trilha 1", y: 0.5 },
        { x: "Trilha 2", y: 0.66 },
        { x: "Trilha 3", y: 0.7 },
      ],
    },
  ];
  async ngOnInit() {
    this.subscriptions.add(
      this.socket.fromEvent("velocidade-tempo-data").subscribe((data: any) => {
        console.log(data);
        this.velocidadeTempo = data;
      })
    );

    this.subscriptions.add(
      this.socket
        .fromEvent("velocidade-aceleracao-data")
        .subscribe((data: any) => {
          console.log(data);
          this.velocidadeAceleracao = data;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  salesSeries: ApexAxisChartSeries = [
    {
      name: "Sales",
      data: [28, 40, 36, 0, 52, 38, 60, 55, 99, 54, 38, 87],
    },
  ];

  uniqueUsersOptions = defaultChartOptions({
    chart: {
      type: "area",
      height: 100,
    },
    colors: ["#ff9800"],
  });
}
