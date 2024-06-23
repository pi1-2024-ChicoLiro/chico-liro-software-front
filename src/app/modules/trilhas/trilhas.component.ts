import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { LoadingService } from "src/app/shared/services/loading.service";
import { TrilhasService } from "src/app/shared/services/trilhas.service";

@Component({
  selector: "vex-trilhas",
  templateUrl: "./trilhas.component.html",
})
export class UsersComponent implements OnInit {
  tableData: any = [];

  count: number = 0;
  limit: number = 10;
  skip: number = 0;
  filter: any;
  body: any = {};

  paginator: { page: number; size: number; length: number } = {
    page: 0,
    size: 10,
    length: 0,
  };

  columns: TableColumn<any>[] = [
    {
      label: "Seleção",
      property: "checkbox",
      type: "checkbox",
      visible: true,
    },
    // { label: "Image", property: "pic", type: "image", visible: true },

    {
      label: "Nome",
      property: "name",
      type: "text",
      cssClasses: ["font-medium"],
      visible: true,
    },

    {
      label: "Em movimento",
      property: "isMovingFormatted",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Data de Ínicio",
      property: "startMovingDatetimeFormatted",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Data de Fim",
      property: "endMovingDatetimeFormatted",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Tempo Total",
      property: "tempoDePercurso",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Distancia (cm)",
      property: "distanciaPercorrida",
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

  constructor(
    private dialog: MatDialog,
    private loadingService: LoadingService,
    private trilhasService: TrilhasService
  ) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {
    this.loadingService.showLoading(true);
    try {
      const response: any = await this.trilhasService.getPaginadoTrilhas(
        this.pagination.pageSize,
        this.pagination.pageIndex
      );
      if (!response.success) {
        return;
      }
      this.tableData = response.data.trilhas;
      this.pagination.length = response.data.count;

      this.subject$.next(this.tableData);
    } catch (error) {
    } finally {
      this.loadingService.showLoading(false);
    }
  }

  async paginatorChange(ev: any) {
    this.pagination.pageSize = ev.pageSize;
    this.pagination.pageIndex = ev.pageIndex + 1;
    this.pagination.length = this.pagination.length;

    await this.getData();
  }
}
