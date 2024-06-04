import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutInstance } from './shared/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutInstanceService {

  constructor(private http: HttpClient) { }

  getWorkoutInstances() {
    return this.http.get('/api/workoutInstances/');
  }

  addWorkoutInstance(data: WorkoutInstance) {
    return this.http.post('/api/workoutInstances/', data);
  }

  removeWorkoutInstace(data: WorkoutInstance) {
    return this.http.delete('/api/workoutInstances/' + data._id);
  }
}
