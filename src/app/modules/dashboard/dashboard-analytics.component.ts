import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { Subscription } from "rxjs";
import { GraficosService } from "./../../shared/services/graficos.service";

@Component({
  selector: "vex-dashboard-analytics",
  templateUrl: "./dashboard-analytics.component.html",
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private socket: Socket,
    private graficosService: GraficosService
  ) {}

  private subscriptions = new Subscription();
  velocidadeTempo: ApexAxisChartSeries = [];
  velocidadeAceleracao: ApexAxisChartSeries = [];
  dadosTrilhas = [];

  async ngOnInit() {
    await this.getDatas();

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

    this.subscriptions.add(
      this.socket.fromEvent("trilhas").subscribe((data: any) => {
        console.log(data);
        this.dadosTrilhas = data;
      })
    );
  }

  async getDatas() {
    const response: any = await this.graficosService.getDatas();
    this.dadosTrilhas = response.dadosTrilhas;
    this.velocidadeTempo = response.dadosVelocidadeTempoFormatados;
    this.velocidadeAceleracao = response.dadosVelocidadeAceleracaoFormatados;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
