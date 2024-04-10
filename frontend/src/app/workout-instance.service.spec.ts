import { TestBed } from '@angular/core/testing';

import { WorkoutInstanceService } from './workout-instance.service';

describe('WorkoutInstanceService', () => {
  let service: WorkoutInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
