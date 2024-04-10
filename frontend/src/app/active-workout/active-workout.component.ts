import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExerciseTemplate, Set, WorkoutInstance, WorkoutTemplate } from '../shared/workout.model';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import events from '../shared/EventService';
import { WorkoutInstanceService } from '../workout-instance.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-active-workout',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './active-workout.component.html',
  styleUrl: './active-workout.component.css'
})
export class ActiveWorkoutComponent implements OnInit, OnDestroy {
  @Input() workout!: WorkoutTemplate;
  activeWorkoutForm!: FormGroup;
  exerciseIdMap: { [name: string]: string | undefined } = {};
  private completeWorkoutSubscription: Subscription | undefined;


  constructor(private formBuilder: FormBuilder, private workoutInstanceService: WorkoutInstanceService) { }

  ngOnInit(): void {
    this.activeWorkoutForm = this.formBuilder.group({
      exercises: this.formBuilder.array(
        this.workout.exercises.map((exerciseData) => this.buildExerciseForm(exerciseData))
      )
    });

    this.completeWorkoutSubscription = events.listen("completeWorkout", (time) => this.submitWorkout(time));
  }

  ngOnDestroy(): void {
    if (this.completeWorkoutSubscription) {
      this.completeWorkoutSubscription.unsubscribe();
    }
  }

  private buildExerciseForm(exerciseData: ExerciseTemplate): FormGroup {
    this.exerciseIdMap[exerciseData.exercise.name] = exerciseData.exercise._id;

    return this.formBuilder.group({
      name: [exerciseData.exercise.name],
      sets: this.formBuilder.array(
        exerciseData.sets.map((setData) => this.buildSetForm(setData))
      )
    });
  }

  private buildSetForm(setData: Set): FormGroup {
    return this.formBuilder.group({
      weight: [setData.weight],
      reps: [setData.reps],
      completed: [false]
    });
  }

  get exercises(): FormArray {
    return (this.activeWorkoutForm.get('exercises') as FormArray);
  }

  getSetControls(exerciseControl: AbstractControl): AbstractControl[] {
    return (exerciseControl.get('sets') as FormArray).controls;
  }

  submitWorkout(time: string) {
    debugger;
    if (!this.activeWorkoutForm.valid) {
      return;
    }

    const completedExercises: ExerciseTemplate[] = [];
    this.exercises.controls.forEach((exerciseControl: AbstractControl) => {
      const sets = (exerciseControl.get('sets') as FormArray).controls;
      const completedSets = sets.filter(setControl => setControl.get('completed')?.value);

      if (completedSets.length > 0) {
        const exercise = exerciseControl.value;
        const mappedExercise: ExerciseTemplate = {
          exercise: {
            _id: this.exerciseIdMap[exercise.name],
            name: exercise.name
          },
          sets: completedSets.map(setControl => ({
            reps: setControl.get('reps')?.value,
            weight: setControl.get('weight')?.value
          }))
        };
        completedExercises.push(mappedExercise)
      }
    });

    const finishedWorkout: WorkoutInstance = {
      template: this.workout,
      timeTaken: time,
      completedExercises: completedExercises
    }

    this.workoutInstanceService.addWorkoutInstance(finishedWorkout).subscribe();
  }
}
