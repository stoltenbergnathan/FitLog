import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutTemplate } from './shared/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getWorkouts() {
    return this.http.get('http://localhost:3000/api/workouts/')
  }

  addWorkout(data: WorkoutTemplate) {
    return this.http.post('http://localhost:3000/api/workouts/', data)
  }

  removeWorkout(data: WorkoutTemplate) {
    return this.http.delete('http://localhost:3000/api/workouts/' + data._id);
  }
}
