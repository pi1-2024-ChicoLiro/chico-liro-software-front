import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { Subscription } from "rxjs";
import { LoadingService } from "src/app/shared/services/loading.service";
import { GraficosService } from "./../../shared/services/graficos.service";
import { UtilsService } from "./../../shared/services/utils.service";

@Component({
  selector: "vex-dashboard-analytics",
  templateUrl: "./dashboard-analytics.component.html",
})
export class DashboardAnalyticsComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private socket: Socket,
    private graficosService: GraficosService,
    private loadingService: LoadingService,
    private utilsService: UtilsService
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
    this.loadingService.showLoading(true);
    try {
      const response: any = await this.graficosService.getDatas();

      if (!response) {
        await this.utilsService.showSnackbar("Erro ao buscar dados", "error");
        return;
      }

      this.dadosTrilhas = response.dadosTrilhas;
      this.velocidadeTempo = response.dadosVelocidadeTempoFormatados;
      this.velocidadeAceleracao = response.dadosVelocidadeAceleracaoFormatados;
    } catch (error) {
    } finally {
      this.loadingService.showLoading(false);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
