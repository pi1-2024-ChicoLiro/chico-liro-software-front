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

  async ngOnInit() {
    this.subscriptions.add(
      this.socket.fromEvent("front-data").subscribe((data) => {
        console.log(data);

        //dados enviados pelo websocket do backend
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  userSessionsSeries: ApexAxisChartSeries = [
    {
      name: "Usuários",
      data: [10, 50, 26, 50, 38, 60, 50, 25, 61, 80, 40, 60],
    },
    {
      name: "Sessões",
      data: [5, 21, 42, 70, 41, 20, 35, 50, 10, 15, 30, 50],
    },
  ];

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
