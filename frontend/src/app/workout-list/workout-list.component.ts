import { Component, Input } from '@angular/core';
import { WorkoutTemplate } from '../shared/workout.model';
import { NgFor } from '@angular/common';
import { WorkoutComponent } from '../workout/workout.component';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [NgFor, WorkoutComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent {
  @Input() workouts: WorkoutTemplate[] = [];
}
