import { Component, OnInit } from '@angular/core';
import { WorkoutInstanceService } from '../workout-instance.service';
import { WorkoutInstance, jsonToWorkoutInstance } from '../shared/workout.model';
import { NgFor } from '@angular/common';
import { WorkoutInstanceComponent } from '../workout-instance/workout-instance.component';
import events from '../shared/EventService';

@Component({
  selector: 'app-workout-history-page',
  standalone: true,
  imports: [NgFor, WorkoutInstanceComponent],
  templateUrl: './workout-history-page.component.html',
  styleUrl: './workout-history-page.component.css'
})
export class WorkoutHistoryPageComponent implements OnInit {
  completedWorkouts: WorkoutInstance[] = [];

  constructor(private workoutService: WorkoutInstanceService) {
    events.listen("deleteCompletedWorkout", (completedWorkoutData: any) => {
      workoutService.removeWorkoutInstace(completedWorkoutData)
        .subscribe(
          (returnedWorkoutData: any) => this.completedWorkouts = this.completedWorkouts.filter((workoutData: WorkoutInstance) => workoutData._id !== returnedWorkoutData._id));
    });
  };

  ngOnInit(): void {
    this.workoutService.getWorkoutInstances().subscribe((data: any) => {
      this.completedWorkouts = data.map((workoutInstanceData: any) => {
        const completedWorkout: WorkoutInstance = jsonToWorkoutInstance(workoutInstanceData);
        return completedWorkout;
      });
    });
  }
}
