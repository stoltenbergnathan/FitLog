import { Routes } from '@angular/router';
import { ExercisePageComponent } from './exercise-page/exercise-page.component';
import { WorkoutPageComponent } from './workout-page/workout-page.component';
import { WorkoutHistoryPageComponent } from './workout-history-page/workout-history-page.component';

export const routes: Routes = [
    { path: 'exercise', component: ExercisePageComponent },
    { path: 'workout', component: WorkoutPageComponent },
    { path: 'workoutHistory', component: WorkoutHistoryPageComponent }
];
