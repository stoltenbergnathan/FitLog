import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutFormComponent } from '../workout-form/workout-form.component';
import { WorkoutListComponent } from '../workout-list/workout-list.component';
import { WorkoutTemplate, jsonToWorkout } from '../shared/workout.model';
import { WorkoutService } from '../workout.service';
import events from '../shared/EventService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-page',
  standalone: true,
  imports: [WorkoutFormComponent, WorkoutListComponent],
  templateUrl: './workout-page.component.html',
  styleUrls: ['./workout-page.component.css']
})
export class WorkoutPageComponent implements OnInit, OnDestroy {
  workouts: WorkoutTemplate[] = [];
  private deleteSubscription!: Subscription;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadWorkouts();

    this.deleteSubscription = events.listen('deleteWorkout', (workoutData: any) => {
      if (workoutData) {
        this.workoutService.removeWorkout(workoutData).subscribe(
          (response: any) => {
            const deletedWorkout = jsonToWorkout(response);
            if (deletedWorkout && deletedWorkout._id) {
              this.workouts = this.workouts.filter((workout: WorkoutTemplate) => workout._id !== deletedWorkout._id);
            }
          },
          error => console.error('Error deleting workout:', error)
        );
      } else {
        console.error('Invalid workout data received for deletion');
      }
    });
  }

  ngOnDestroy() {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  loadWorkouts() {
    this.workoutService.getWorkouts().subscribe((data: any) => {
      this.workouts = data.map((workoutData: any) => jsonToWorkout(workoutData));
    });
  }

  addWorkout(data: WorkoutTemplate) {
    this.workoutService.addWorkout(data).subscribe((workoutData: any) => {
      this.workouts.push(jsonToWorkout(workoutData));
    });
  }

  editWorkout(data: WorkoutTemplate) {
    this.workoutService.editWorkout(data).subscribe((updatedWorkoutJSON: any) => {
      const updatedWorkout: WorkoutTemplate = jsonToWorkout(updatedWorkoutJSON);
      const index = this.workouts.findIndex(workout => workout._id === updatedWorkout._id);
      if (index !== -1) {
        this.workouts[index] = updatedWorkout;
      }
    });
  }
}
