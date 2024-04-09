import { Component, OnInit } from '@angular/core';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { WorkoutTemplate, jsonToWorkout } from '../shared/workout.model';
import { WorkoutService } from '../workout.service';
import events from '../shared/EventService';

@Component({
  selector: 'app-workout-page',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent],
  templateUrl: './workout-page.component.html',
  styleUrl: './workout-page.component.css'
})
export class WorkoutPageComponent implements OnInit {
  workouts: WorkoutTemplate[] = [];

  constructor(private workoutService: WorkoutService) {
    events.listen('deleteWorkout', (workoutData: any) => {
      this.workoutService.removeWorkout(workoutData).subscribe(
        (workoutData: any) => this.workouts = this.workouts.filter((workout: WorkoutTemplate) => workout._id !== jsonToWorkout(workoutData)._id)
      );
    });
  }

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe((data: any) => {
      this.workouts = data.map((workoutData: any) => {
        const workout: WorkoutTemplate = jsonToWorkout(workoutData);
        return workout
      });
    });
  }

  addWorkout(data: WorkoutTemplate): void {
    this.workoutService.addWorkout(data).subscribe((workoutData: any) => this.workouts.push(jsonToWorkout(workoutData)));
  }
}