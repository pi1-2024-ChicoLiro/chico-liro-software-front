import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class TrilhasService {
  constructor(private http: HttpClient) {}

  async getPaginadoTrilhas(limit: number, page: number) {
    return await lastValueFrom(
      this.http.get(
        `${environment.BASE_URL}/trilha/get-paginado?limit=${limit}&page=${page}`
      )
    );
  }

  async getAllTrilhas() {
    return await lastValueFrom(
      this.http.get(`${environment.BASE_URL}/trilha/get-all`)
    );
  }
}
