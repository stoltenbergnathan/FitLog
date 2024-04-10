import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WorkoutInstance } from './shared/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutInstanceService {

  constructor(private http: HttpClient) { }

  getWorkoutInstances() {
    return this.http.get('http://localhost:3000/api/workoutInstances/');
  }

  addWorkoutInstance(data: WorkoutInstance) {
    return this.http.post('http://localhost:3000/api/workoutInstances/', data);
  }

  removeWorkoutInstace(data: WorkoutInstance) {
    return this.http.delete('http://localhost:3000/api/workoutInstaces/' + data._id);
  }
}
