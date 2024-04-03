import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Exercise } from '../shared/workout.model';

@Component({
  selector: 'app-exercise-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exercise-form.component.html',
  styleUrl: './exercise-form.component.css'
})
export class ExerciseFormComponent {
  @Output() addExercise = new EventEmitter<Exercise>();

  newExerciseText = "";

  addNewExercise(): void {
    this.addExercise.emit({name: this.newExerciseText});
    this.newExerciseText = "";
  }
}
