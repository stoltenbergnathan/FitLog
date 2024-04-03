import { Component, Input } from '@angular/core';
import { ExerciseComponent } from '../exercise/exercise.component';
import { CommonModule, NgFor } from '@angular/common';
import { Exercise } from '../shared/workout.model';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [ExerciseComponent, CommonModule, NgFor],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.css'
})
export class ExerciseListComponent {
  @Input() exercises: Exercise[] = [];
}
