import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { WidgetColumnChartModule } from "src/@vex/components/widgets/widget-column/widget-column.module";
import { LineComponent } from "src/app/shared/components/line/line.component";
import { BreadcrumbsModule } from "../../../@vex/components/breadcrumbs/breadcrumbs.module";
import { ChartModule } from "../../../@vex/components/chart/chart.module";
import { PageLayoutModule } from "../../../@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "../../../@vex/components/secondary-toolbar/secondary-toolbar.module";
import { WidgetAssistantModule } from "../../../@vex/components/widgets/widget-assistant/widget-assistant.module";
import { WidgetLargeChartModule } from "../../../@vex/components/widgets/widget-large-chart/widget-large-chart.module";
import { WidgetLargeGoalChartModule } from "../../../@vex/components/widgets/widget-large-goal-chart/widget-large-goal-chart.module";
import { WidgetQuickLineChartModule } from "../../../@vex/components/widgets/widget-quick-line-chart/widget-quick-line-chart.module";
import { WidgetQuickValueCenterModule } from "../../../@vex/components/widgets/widget-quick-value-center/widget-quick-value-center.module";
import { WidgetQuickValueStartModule } from "../../../@vex/components/widgets/widget-quick-value-start/widget-quick-value-start.module";
import { WidgetTableModule } from "../../../@vex/components/widgets/widget-table/widget-table.module";
import { DashboardAnalyticsRoutingModule } from "./dashboard-analytics-routing.module";
import { DashboardAnalyticsComponent } from "./dashboard-analytics.component";

@NgModule({
  declarations: [DashboardAnalyticsComponent, LineComponent],
  imports: [
    CommonModule,
    DashboardAnalyticsRoutingModule,
    ChartModule,
    MatIconModule,
    WidgetQuickLineChartModule,
    WidgetQuickValueCenterModule,
    WidgetQuickValueStartModule,
    WidgetLargeGoalChartModule,
    WidgetColumnChartModule,
    WidgetAssistantModule,
    WidgetLargeChartModule,
    WidgetTableModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatButtonModule,
    PageLayoutModule,
    MatSnackBarModule,
  ],
})
export class DashboardAnalyticsModule {}
