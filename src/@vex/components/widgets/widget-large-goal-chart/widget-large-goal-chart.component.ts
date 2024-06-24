import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "vex-widget-large-goal-chart",
  templateUrl: "./widget-large-goal-chart.component.html",
})
export class WidgetLargeGoalChartComponent implements OnInit {
  @Input() data: {
    velocidade: number;
    aceleracao: number;
    tensao: number;
    percurso: string;
    distancia: number;
    tempoPercurso: number;
  };

  constructor() {}

  ngOnInit() {}
}
