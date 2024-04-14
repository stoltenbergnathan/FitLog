import { NgFor } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { WorkoutTemplate, Set, ExerciseTemplate, Exercise, jsonToExercise } from '../shared/workout.model';
import { ExerciseService } from '../exercise.service';

import events from '../shared/EventService';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent implements OnInit {
  @Output() addWorkout = new EventEmitter<WorkoutTemplate>();
  @Output() editWorkout = new EventEmitter<WorkoutTemplate>();
  workoutForm!: FormGroup;
  edit: boolean = false;
  trackedId: string = "";
  availableExercises: Exercise[] = [];
  selectedExercises: Exercise[] = [];

  constructor(private formBuilder: FormBuilder, private exerciseService: ExerciseService) {
    events.listen("editWorkout", (data: any) => {
      this.edit = true;
      this.trackedId = data._id;
      this.buildForm(data);
    });
  }

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

  buildForm(workout: WorkoutTemplate) {
    this.workoutForm = this.formBuilder.group({
      workoutName: [workout.name],
      exercises: this.formBuilder.array(
        workout.exercises.map((exerciseData: ExerciseTemplate) => {
          const exerciseGroup = this.createExercise(exerciseData.exercise);
          exerciseData.sets.forEach(set => {
            (exerciseGroup.get("sets") as FormArray).push(this.createSet(set.reps, set.weight));
          });
          return exerciseGroup;
        })
      )
    })
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

  createSet(reps?: number, weight?: number): FormGroup {
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
        sets: this.formBuilder.array([])
      }
    )
  }

  addExercise(exercise: Exercise): void {
    this.exercises.push(this.createExercise(exercise))
  }

  submitForm(): void {
    if (!this.workoutForm.valid)
      return;
    
    if (!this.edit) {
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
    } else {
      const workoutData: WorkoutTemplate = {
        _id: this.trackedId,
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
      
      this.editWorkout.emit(workoutData);
      this.edit = false;
      this.trackedId = "";
    }
  
    this.workoutForm.reset();
    this.clearExercises();
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
