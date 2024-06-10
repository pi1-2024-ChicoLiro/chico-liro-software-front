import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable } from "rxjs";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { DadosService } from "src/app/shared/services/dados.service";
import { LoadingService } from "src/app/shared/services/loading.service";
import { TrilhasService } from "src/app/shared/services/trilhas.service";

@UntilDestroy()
@Component({
  selector: "vex-dados",
  templateUrl: "./dados.component.html",
})
export class DadosComponent implements OnInit {
  tableData: any = [];
  complete = false;
  searchCtrl = new UntypedFormControl();

  count: number = 0;
  limit: number = 10;
  skip: number = 0;
  filter: any;
  body: any = {};

  columns: TableColumn<any>[] = [
    {
      label: "Seleção",
      property: "checkbox",
      type: "checkbox",
      visible: true,
    },
    // { label: "Imagem", property: "profilePic", type: "image", visible: true },

    {
      label: "RPM",
      property: "rpm",
      type: "text",
      cssClasses: ["font-medium"],
      visible: true,
    },

    {
      label: "Tensão",
      property: "tensao",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Velocidade Inst",
      property: "velocidadeInstantanea",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },

    {
      label: "Aceleração Inst",
      property: "acelaeracaoInstantanea",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Consumo Energetico",
      property: "consumoEnergetico",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Data Criação",
      property: "createdAt",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
  ];

  pagination = {
    pageIndex: 1,
    pageSize: 10,
    length: 0,
  };

  subject$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  data$: Observable<any> = this.subject$.asObservable();
  trilhasData = [];

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private dadosService: DadosService,
    private trilhasService: TrilhasService
  ) {}

  async ngOnInit() {
    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));

    const [trilhas, data]: any = await Promise.all([
      this.trilhasService.getAllTrilhas(),
      this.getAllData(),
    ]);

    this.trilhasData = trilhas.data;
  }

  async getAllData() {
    this.loadingService.showLoading(true);
    try {
      const response: any = await this.dadosService.getAll(
        this.pagination.pageSize,
        this.pagination.pageIndex
      );

      this.tableData = response.data.dados;
      this.pagination.length = response.data.count;

      this.subject$.next(this.tableData);
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.showLoading(false);
      this.complete = true;
    }
  }

  async trilhaChange(trilhaId: any) {
    if (trilhaId == 0) return await this.getAllData();

    this.loadingService.showLoading(true);
    try {
      const response: any = await this.dadosService.getDadosByTrilha(
        trilhaId,
        this.pagination.pageSize,
        this.pagination.pageIndex
      );

      this.tableData = response.data.dados;
      this.pagination.length = response.data.count;

      this.subject$.next(this.tableData);
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingService.showLoading(false);
    }
  }

  onFilterChange(value: string) {
    if (!this.tableData) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.tableData.filter = value;
  }

  async paginatorChange(ev: any) {
    this.pagination.pageSize = ev.pageSize;
    this.pagination.pageIndex = ev.pageIndex + 1;
    this.pagination.length = this.pagination.length;

    await this.getAllData();
  }
}
