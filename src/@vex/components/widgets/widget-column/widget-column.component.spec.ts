import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { WidgetColumnChartComponent } from "./widget-column.component";

describe("WidgetColumnChartComponent", () => {
  let component: WidgetColumnChartComponent;
  let fixture: ComponentFixture<WidgetColumnChartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WidgetColumnChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
