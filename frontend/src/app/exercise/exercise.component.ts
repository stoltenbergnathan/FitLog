import { Component, Input } from '@angular/core';
import { Exercise } from '../shared/workout.model';
import { NgIf } from '@angular/common';
import events from '../shared/EventService';

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [NgIf],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent {
  @Input() exercise!: Exercise;
  hoverTrash: boolean = false;

  deleteExercise(): void {
    events.emit('deleteExercise', this.exercise);
  }
}
