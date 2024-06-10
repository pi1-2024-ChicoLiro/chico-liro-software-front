import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { ScrollbarModule } from "src/@vex/components/scrollbar/scrollbar.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";
import { VexModule } from "src/@vex/vex.module";
import { environment } from "src/environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CustomLayoutModule } from "./custom-layout/custom-layout.module";
import { DadosComponent } from "./modules/dados/dados.component";
import { DashboardAnalyticsModule } from "./modules/dashboard/dashboard-analytics.module";
import { UsersComponent } from "./modules/trilhas/trilhas.component";
import { AioTableModule } from "./shared/components/aio-table/aio-table.module";
import { DadosService } from "./shared/services/dados.service";
import { LoadingService } from "./shared/services/loading.service";
import { TrilhasService } from "./shared/services/trilhas.service";
import { UtilsService } from "./shared/services/utils.service";

const config: SocketIoConfig = {
  url: environment.SOCKET_URL,
  options: {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
  },
};

@NgModule({
  declarations: [AppComponent, UsersComponent, DadosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule,
    CustomLayoutModule,
    DashboardAnalyticsModule,
    AioTableModule,
    ScrollbarModule,
    ReactiveFormsModule,
    SecondaryToolbarModule,
    BreadcrumbsModule,
    MatIconModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      backdropBackgroundColour: "rgba(0,0,0,0.5)",
      backdropBorderRadius: "4px",
      primaryColour: "#ffffff",
      secondaryColour: "#ffffff",
      tertiaryColour: "#ffffff",
      fullScreenBackdrop: true,
    }),
    SocketIoModule.forRoot(config),
  ],
  providers: [LoadingService, UtilsService, TrilhasService, DadosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
