import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class GraficosService {
  constructor(private http: HttpClient) {}

  async getDatas() {
    return await lastValueFrom(
      this.http.get<any>(`${environment.BASE_URL}/graficos/get-all`)
    );
  }
}
