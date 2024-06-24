import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { CustomLayoutComponent } from "./custom-layout/custom-layout.component";
import { DadosComponent } from "./modules/dados/dados.component";
import { UsersComponent } from "./modules/trilhas/trilhas.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: CustomLayoutComponent,

    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./modules/dashboard/dashboard-analytics.module").then(
            (m) => m.DashboardAnalyticsModule
          ),
      },
      {
        path: "trilhas",
        component: UsersComponent,
      },
      {
        path: "dados",
        component: DadosComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
