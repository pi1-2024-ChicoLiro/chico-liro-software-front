import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Observable, ReplaySubject, of } from "rxjs";
import { filter } from "rxjs/operators";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";

import { SelectionModel } from "@angular/cdk/collections";
import { UntypedFormControl } from "@angular/forms";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";

@UntilDestroy()
@Component({
  selector: "vex-aio-table",
  templateUrl: "./aio-table.component.html",
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "fill",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class AioTableComponent<T> implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl("fullwidth");

  @Input() data: T[];
  @Input() menu: any[];
  @Input() title: string;
  @Input() count: number = 0;
  @Input() createBtn: boolean = true;
  @Output() create = new EventEmitter<T>();
  @Output() update = new EventEmitter<T>();
  @Output() updateStatus = new EventEmitter<T>();
  @Output() show = new EventEmitter<T>();
  @Output() reload = new EventEmitter();
  @Output() delete = new EventEmitter<T>();
  @Output() deleteSelect = new EventEmitter<T[]>();
  @Output() paginatorChanged = new EventEmitter<T>();
  @Output() filting = new EventEmitter<T>();
  @Input() length: any;

  subject$: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);
  data$: Observable<T[]> = this.subject$.asObservable();
  items: T[];

  @Input()
  columns: TableColumn<T>[] = [];
  pageSize = 10;
  @Input()
  pageSizeOptions: number[] = [5, 10, 20, 50, 100, 200, 500];
  @Input()
  dataSource: MatTableDataSource<T> | null;
  selection = new SelectionModel<T>(true, []);
  @Input()
  searchCtrl = new UntypedFormControl();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialog: MatDialog, private cdref: ChangeDetectorRef) {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.updateData();
  // }

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  getData() {
    if (this.data) return of(this.data);
  }

  updateData(data?: T[], count?: number) {
    if (data) this.data = data;
    if (this.data)
      this.getData().subscribe((items) => {
        this.subject$.next(items);
      });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<T[]>(Boolean)).subscribe((items) => {
      this.items = items;
      this.dataSource.data = items;
    });

    this.searchCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value) => this.onFilterChange(value));
    this.count = count;
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    await this.updateData(this.data);
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Itens por página:";
    this.paginator.length = this.length;
    this.cdref.detectChanges();
  }

  btnDelete(item: T) {
    this.delete.emit(item);
  }

  btnDeleteSelect(items: T[]) {
    this.deleteSelect.emit(items);
  }

  btnCreate(item?: T) {
    this.create.emit(item || null);
  }

  btnUpdate(item: T) {
    this.update.emit(item);
  }

  btnShow(item: T) {
    this.show.emit(item);
  }

  btnReload() {
    this.reload.emit();
  }

  btnUpdateStatus(item: T) {
    this.updateStatus.emit(item);
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value?.trim();
    value = value?.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  changingPage(data: any) {
    this.paginatorChanged.emit(data);
  }

  btnSearch() {
    this.filting.emit(this.searchCtrl.value);
  }

  btnReset() {
    this.searchCtrl.reset();
    this.filting.emit(null);
  }
}
