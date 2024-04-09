import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkoutModalComponent } from './active-workout-modal.component';

describe('ActiveWorkoutModalComponent', () => {
  let component: ActiveWorkoutModalComponent;
  let fixture: ComponentFixture<ActiveWorkoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveWorkoutModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveWorkoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
