import { Component, Input, ViewChild } from '@angular/core';
import { Exercise, WorkoutTemplate } from '../shared/workout.model';
import { NgFor, NgIf } from '@angular/common';
import events from '../shared/EventService';
import { ActiveWorkoutModalComponent } from '../active-workout-modal/active-workout-modal.component';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [NgFor, NgIf, ActiveWorkoutModalComponent],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
  @Input() workout!: WorkoutTemplate;
  @ViewChild(ActiveWorkoutModalComponent) activeWorkoutModal!: ActiveWorkoutModalComponent;
  hover: boolean = false;

  getExerciseName(exercise: Exercise): string {
    if (exercise) {
      return exercise.name;
    } else {
      return "Exercise Not Found";
    }
  }

  deleteWorkout() {
    events.emit('deleteWorkout', this.workout);
  }

  startWorkout() {
    this.activeWorkoutModal.openModalWithWorkout(this.workout);
  }
}
