import { Component, Input, OnInit } from '@angular/core';
import { ExerciseTemplate, Set, WorkoutTemplate } from '../shared/workout.model';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-active-workout',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './active-workout.component.html',
  styleUrl: './active-workout.component.css'
})
export class ActiveWorkoutComponent implements OnInit{
  @Input() workout!: WorkoutTemplate;
  activeWorkoutForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.activeWorkoutForm = this.formBuilder.group({
      exercises: this.formBuilder.array(
        this.workout.exercises.map((exerciseData) => this.buildExerciseForm(exerciseData))
      )
    });
  }

  private buildExerciseForm(exerciseData: ExerciseTemplate): FormGroup {
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
      reps: [setData.reps]
    });
  }

  get exercises(): FormArray {
    return (this.activeWorkoutForm.get('exercises') as FormArray);
  }

  getSetControls(exerciseControl: AbstractControl): AbstractControl[] {
    return (exerciseControl.get('sets') as FormArray).controls;
  }
}
