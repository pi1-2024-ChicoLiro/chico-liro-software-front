import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, Observable, of } from "rxjs";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { LoadingService } from "src/app/shared/services/loading.service";

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
      label: "Nome",
      property: "nome",
      type: "text",
      cssClasses: ["font-medium"],
      visible: true,
    },

    {
      label: "Telefone",
      property: "telefone",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },
    {
      label: "Status",
      property: "status",
      type: "text",
      cssClasses: ["text-secondary"],
      visible: true,
    },

    {
      label: "Tags",
      property: "tag",
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
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
    await this.getAllData();
  }

  getData(clientes) {
    return of(clientes);
  }

  async getAllData() {
    // this.loadingService.showLoading(true);
    // try {
    //   const response: any = await this.clientsService.getClients(
    //     this.pagination.pageSize,
    //     this.pagination.pageIndex
    //   );
    //   this.pagination.length = response.count;
    //   this.getData(response.items).subscribe((customers) => {
    //     this.subject$.next(customers);
    //   });
    //   this.data$.pipe(filter<any>(Boolean)).subscribe((clients) => {
    //     this.tableData = clients;
    //   });
    //   // if (response.limit) {
    //   //   this.tableData = response.items;
    //   //   this.pagination.length = response.count;
    //   //   this.cd.detectChanges()
    //   // }
    // } catch (error) {
    //   console.log(error);
    //   this.utilsService.showSnackbar(error.error.message, "error");
    // } finally {
    //   this.loadingService.showLoading(false);
    //   this.complete = true;
    // }
  }

  reload() {}

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
