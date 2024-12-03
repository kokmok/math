import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRunComponent } from './time-run.component';

describe('TimeRunComponent', () => {
  let component: TimeRunComponent;
  let fixture: ComponentFixture<TimeRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeRunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
