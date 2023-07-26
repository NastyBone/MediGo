import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRangeComponent } from './report-range.component';

describe('ReportRangeComponent', () => {
  let component: ReportRangeComponent;
  let fixture: ComponentFixture<ReportRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
