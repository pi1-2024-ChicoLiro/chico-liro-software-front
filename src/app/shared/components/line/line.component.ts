import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { Socket } from "ngx-socket-io";
import { LineService } from "../../services/line.service";

@Component({
  selector: "vex-line",
  templateUrl: "./line.component.html",
  styleUrls: ["./line.component.scss"],
})
export class LineComponent implements OnInit, OnChanges {
  @ViewChild("canvas", { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() data = [];
  @Input() name = "";
  cnvWidth = 400;
  cnvHeight = 400;

  constructor(private lineService: LineService, private socket: Socket) {
    // this.lineService.dataLine$.subscribe((data) => {
    //   if (data) {
    //     console.log(data);
    //     this.data = data;
    //     this.draw();
    //   }
    // });
  }

  ngOnInit(): void {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.draw();
    }
  }

  private draw(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const points = this.calculatePoints(this.data);
      this.drawPath(ctx, points);
    }
  }

  private drawPath(
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[]
  ): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });

    ctx.stroke();
  }

  private calculatePoints(data: any): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    let x = this.cnvWidth / 2;
    let y = this.cnvHeight / 2;
    let angle = Math.PI / 2;

    points.push({ x, y });

    data.forEach((point) => {
      const { rpmMotorEsq, rpmMotorDir } = point;
      const delta = this.calculateDelta(rpmMotorEsq, rpmMotorDir);
      angle += delta.angleDelta;
      x += delta.distance * Math.cos(angle);
      y -= delta.distance * Math.sin(angle);

      points.push({ x, y });
    });

    return points;
  }

  private calculateDelta(
    leftMotorRpm: number,
    rightMotorRpm: number
  ): { distance: number; angleDelta: number } {
    const wheelBase = 10;
    const wheelRadius = 3.4;
    const timeInterval = 1;

    const leftWheelDistance =
      (leftMotorRpm / 60) * wheelRadius * 2 * Math.PI * timeInterval;
    const rightWheelDistance =
      (rightMotorRpm / 60) * wheelRadius * 2 * Math.PI * timeInterval;

    const distance = (leftWheelDistance + rightWheelDistance) / 2;
    const angleDelta =
      ((rightWheelDistance - leftWheelDistance) / wheelBase) % Math.PI;

    return { distance, angleDelta };
  }
}
