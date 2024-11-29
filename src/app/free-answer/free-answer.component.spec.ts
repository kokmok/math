import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAnswerComponent } from './free-answer.component';

describe('FreeAnswerComponent', () => {
  let component: FreeAnswerComponent;
  let fixture: ComponentFixture<FreeAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeAnswerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
