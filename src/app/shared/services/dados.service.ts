import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class DadosService {
  constructor(private http: HttpClient) {}

  async getDadosByTrilha(trilhaId: string, limit: number, page: number) {
    return await lastValueFrom(
      this.http.get(
        `${environment.BASE_URL}/dados/get-by-trilha/${trilhaId}?limit=${limit}&page=${page}`
      )
    );
  }

  async getAll(limit: number, page: number) {
    return await lastValueFrom(
      this.http.get(
        `${environment.BASE_URL}/dados/get-paginado?limit=${limit}&page=${page}`
      )
    );
  }
}
