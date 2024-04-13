import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutHistoryPageComponent } from './workout-history-page.component';

describe('WorkoutHistoryPageComponent', () => {
  let component: WorkoutHistoryPageComponent;
  let fixture: ComponentFixture<WorkoutHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutHistoryPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
