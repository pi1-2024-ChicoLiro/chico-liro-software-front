import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LineService {
  private dataLineSubject = new BehaviorSubject<any>([]);
  dataLine$ = this.dataLineSubject.asObservable();

  constructor() {}

  setData(data: any) {
    this.dataLineSubject.next(data);
  }
}
