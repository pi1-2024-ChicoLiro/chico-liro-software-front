import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Socket } from "ngx-socket-io";
import { Subscription } from "rxjs";
import { LineService } from "src/app/shared/services/line.service";
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
    private utilsService: UtilsService,
    private lineService: LineService,
    private cd: ChangeDetectorRef
  ) {}

  private subscriptions = new Subscription();
  velocidadeTempo: ApexAxisChartSeries = [];
  velocidadeAceleracao: ApexAxisChartSeries = [];
  dadosTrilhas = [];

  dadosDesenho = [];

  async ngOnInit() {
    await this.getDatas();

    this.subscriptions.add(
      this.socket.fromEvent("velocidade-tempo-data").subscribe((data: any) => {
        // console.log(data);
        this.velocidadeTempo = data;
      })
    );

    this.subscriptions.add(
      this.socket
        .fromEvent("velocidade-aceleracao-data")
        .subscribe((data: any) => {
          this.velocidadeAceleracao = data;
        })
    );

    this.subscriptions.add(
      this.socket.fromEvent("trilhas").subscribe((data: any) => {
        this.dadosTrilhas = data;
      })
    );

    this.subscriptions.add(
      this.socket.fromEvent("line").subscribe((data: any) => {
        this.dadosDesenho = data;

        // this.lineService.setData(data);
      })
    );
  }

  async getDatas() {
    await this.loadingService.showLoading(true);
    try {
      const [response, lines] = await Promise.all([
        this.graficosService.getDatas(),
        this.graficosService.getLines(),
      ]);

      if (!response) {
        await this.utilsService.showSnackbar("Erro ao buscar dados", "error");
        return;
      }

      this.dadosTrilhas = response.dadosTrilhas;
      this.velocidadeTempo = response.dadosVelocidadeTempoFormatados;
      this.velocidadeAceleracao = response.dadosVelocidadeAceleracaoFormatados;
      this.dadosDesenho = lines;

      this.cd.detectChanges();
    } catch (error) {
    } finally {
      await this.loadingService.showLoading(false);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
