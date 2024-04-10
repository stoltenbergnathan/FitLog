import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { WorkoutTemplate, Set, ExerciseTemplate, Exercise, jsonToExercise } from '../shared/workout.model';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent implements OnInit {
  @Output() addWorkout = new EventEmitter<WorkoutTemplate>();
  workoutForm!: FormGroup;
  availableExercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];

  constructor(private formBuilder: FormBuilder, private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.workoutForm = this.formBuilder.group({
      workoutName: [''],
      exercises: this.formBuilder.array([])
    });

    this.exerciseService.getExercises().subscribe(
      (data: any) => data.map(
        (exerciseData: any) => this.availableExercises.push(jsonToExercise(exerciseData))
      )
    );
  }

  get workoutName(): FormControl {
    return (this.workoutForm.get('workoutName') as FormControl)
  }

  get exercises(): FormArray {
    return (this.workoutForm.get('exercises') as FormArray)
  }

  getSets(exerciseIndex: number): FormArray {
    return (this.exercises.at(exerciseIndex).get('sets') as FormArray)
  }

  createSet(reps?: string, weight?: string): FormGroup {
    return this.formBuilder.group(
      {
        reps: [reps ? reps : ''],
        weight: [weight ? weight : '']
      }
    )
  }

  addSet(exerciseIndex: number): void {
    const setArray = (this.exercises.at(exerciseIndex).get('sets') as FormArray<FormGroup>);
    if (setArray.length === 0) {
      setArray.push(this.createSet());
    }
    else {
      const prevSet = setArray.value[setArray.length - 1];
      setArray.push(this.createSet(prevSet.reps, prevSet.weight));
    }
  }

  createExercise(exercise: Exercise): FormGroup {
    return this.formBuilder.group(
      {
        exerciseName: [exercise.name],
        sets: this.formBuilder.array([this.createSet()])
      }
    )
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(this.createExercise(exercise))
  }

  submitForm(): void {
    if (this.workoutForm.valid) {
      const workoutData: WorkoutTemplate = {
        name: this.workoutName.value,
        exercises: this.exercises.value.map((exercise: any) => {
          const mappedExercise: ExerciseTemplate = {
            exercise: {
              _id: this.availableExercises.find((e) => e.name === exercise.exerciseName)!._id,
              name: exercise.exerciseName
            },
            sets: exercise.sets.map((set: any) => {
              const mappedSet: Set = {
                reps: set.reps,
                weight: set.weight,
              };
              return mappedSet;
            })
          };
          return mappedExercise;
        })
      };

      this.addWorkout.emit(workoutData);
    
      this.workoutForm.reset();
      this.clearExercises();
    }
  }

  clearExercises(): void {
    this.exercises.clear()
  }

  getControl(control: AbstractControl | null): FormControl {
    if (control instanceof FormControl) {
      return (control as FormControl)
    }
    throw new Error("The control is not a FormControl" + control)
  }

  selectExercise(event: any, exercise: Exercise): void {
    const target: HTMLElement = event.target;
    const selectedColor = "lightblue";
    const unselectedColor = "";

    if (target.style.backgroundColor === selectedColor) {
      target.style.backgroundColor = unselectedColor;
      this.selectedExercises = this.selectedExercises.filter((e) => e !== exercise);
    }
    else {
      target.style.backgroundColor = selectedColor;
      this.selectedExercises.push(exercise);
    }
  }

  closeExerciseModal(): void {
    const modelBody = document.getElementById("exerciseModalBody");
    if(modelBody === null)
      throw new Error("Could not find exerciseModalBody");

    for(let exerciseDiv of Array.from(modelBody.children)) {
      (exerciseDiv as HTMLElement).style.backgroundColor = "";
    }
    this.selectedExercises = [];
  }

  addExercisesFromModal(): void {
    this.selectedExercises.map((exercise: Exercise) => this.addExercise(exercise));
    this.closeExerciseModal();
  }
}
