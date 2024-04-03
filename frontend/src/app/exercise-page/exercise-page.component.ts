import { Component, OnInit } from '@angular/core';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { ExerciseService } from '../exercise.service';
import { Exercise, jsonToExercise } from '../shared/workout.model';
import events from '../shared/EventService';


@Component({
  selector: 'app-exercise-page',
  standalone: true,
  imports: [ExerciseFormComponent, ExerciseListComponent],
  templateUrl: './exercise-page.component.html',
  styleUrl: './exercise-page.component.css'
})
export class ExercisePageComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {
    events.listen('deleteExercise', (excerciseData: any) => {
      this.exerciseService.removeExercise(excerciseData).subscribe(
        (exerciseData: any) => this.exercises = this.exercises.filter((exercise: Exercise) => exercise._id !== jsonToExercise(excerciseData)._id)
      )
    })
  }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe((data: any) => {
      this.exercises = data.map((exerciseData: any) => {
        const exercise: Exercise = jsonToExercise(exerciseData);
        return exercise
      });
    });
  }

  addExercise(data: Exercise): void {
    this.exerciseService.addExercise(data).subscribe((exerciseData: any) => this.exercises.push(jsonToExercise(exerciseData)));
  }
}
