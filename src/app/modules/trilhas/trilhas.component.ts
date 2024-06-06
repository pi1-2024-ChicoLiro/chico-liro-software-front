import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { LoadingService } from "src/app/shared/services/loading.service";

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
      property: "nome",
      type: "text",
      cssClasses: ["font-medium"],
      visible: true,
    },
    // {
    //   label: "Usuário",
    //   property: "usuario",
    //   type: "text",
    //   cssClasses: ["text-secondary"],
    //   visible: true,
    // },
    {
      label: "Em uso",
      property: "isMoving",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Data de Ínicio",
      property: "startDate",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Data de Fim",
      property: "email",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Tempo Total",
      property: "time",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
  ];

  menu: any[] = [
    {
      menu: "delete",
    },
    {
      menu: "update",
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
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    await this.getData();
  }

  async getData() {}

  async paginatorChange(ev: any) {
    this.pagination.pageSize = ev.pageSize;
    this.pagination.pageIndex = ev.pageIndex + 1;
    this.pagination.length = this.pagination.length;

    await this.getData();
  }
}
