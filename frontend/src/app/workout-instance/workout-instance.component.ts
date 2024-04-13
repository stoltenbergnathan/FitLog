import { Component, Input } from '@angular/core';
import { ExerciseTemplate, Set, WorkoutInstance } from '../shared/workout.model';
import { NgFor, NgIf } from '@angular/common';
import events from '../shared/EventService';

@Component({
  selector: 'app-workout-instance',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './workout-instance.component.html',
  styleUrl: './workout-instance.component.css'
})
export class WorkoutInstanceComponent {
  @Input() workout!: WorkoutInstance;
  hover: boolean = false;

  get formattedDate(): string {
    if (this.workout.createdAt === undefined) {
      return "";
    }

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[this.workout.createdAt.getDay()];
    const month = monthsOfYear[this.workout.createdAt.getMonth()];
    const dayOfMonth = this.workout.createdAt.getDate();
    const year = this.workout.createdAt.getFullYear();

    return `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;
  }

  get formattedTime(): string {
    const [hours, minutes, seconds] = this.workout.timeTaken.split(':').map(Number);

    let formattedTime = '';

    if (hours > 0) {
      formattedTime += `${hours}h `;
    }

    if (minutes > 0) {
      formattedTime += `${minutes}m `;
    }

    if (seconds > 0 || formattedTime === '') {
      formattedTime += `${seconds}s`;
    }

    return formattedTime.trim();
  }

  get totalVolume() {
    return this.workout.completedExercises.reduce((acc: number, excerciseData: ExerciseTemplate) => {
      return acc + excerciseData.sets.reduce((acc: number, setData: Set) => {
        return acc + (setData.reps * setData.weight);
      }, 0);
    }, 0);
  }

  deleteWorkout() {
    events.emit("deleteCompletedWorkout", this.workout);
  }

}
