import { Component, Input } from '@angular/core';
import { WorkoutTemplate } from '../shared/workout.model';
import { NgFor, NgIf } from '@angular/common';
import events from '../shared/EventService';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
  @Input() workout!: WorkoutTemplate;
  hoverTrash: boolean = false;

  deleteWorkout(): void {
    // TODO: confirm deletion
    events.emit('deleteWorkout', this.workout);
  }
}
