import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StopwatchComponent } from '../stopwatch/stopwatch.component';
import { WorkoutTemplate } from '../shared/workout.model';
import { ActiveWorkoutComponent } from '../active-workout/active-workout.component';
import events from '../shared/EventService';

@Component({
  selector: 'app-active-workout-modal',
  standalone: true,
  imports: [CommonModule, StopwatchComponent, ActiveWorkoutComponent],
  templateUrl: './active-workout-modal.component.html',
  styleUrl: './active-workout-modal.component.css'
})
export class ActiveWorkoutModalComponent {
  isOpen: boolean = false;
  selectedWorkout: WorkoutTemplate | null = null;

  stopWatchRunning: boolean = false;
  time: string = '00:00:00.00';

  openModalWithWorkout(workout: WorkoutTemplate) {
    this.selectedWorkout = workout;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
    this.stopWatchRunning = false;
    this.time = '00:00:00.00';
    this.selectedWorkout = null;
  }

  submitWorkout() {
    events.emit("completeWorkout", this.time);
    this.closeModal();
  }
}
