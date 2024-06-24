import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ChartModule } from "../../chart/chart.module";
import { WidgetColumnChartComponent } from "./widget-column.component";

@NgModule({
  declarations: [WidgetColumnChartComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, ChartModule],
  exports: [WidgetColumnChartComponent],
})
export class WidgetColumnChartModule {}
