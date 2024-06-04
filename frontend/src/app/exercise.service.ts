import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Exercise } from './shared/workout.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getExercises() {
    return this.http.get('http://localhost:3000/api/exercises/')
  }

  addExercise(data: Exercise) {
    return this.http.post('http://localhost:3000/api/exercises/', data)
  }

  removeExercise(data: Exercise) {
    return this.http.delete('http://localhost:3000/api/exercises/' + data._id);
  }
}
