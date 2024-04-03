export interface Set {
    reps: number;
    weight: number;
    warmup: boolean;
}

export interface Exercise {
    _id?: string,
    name: string
}

export interface ExerciseTemplate {
    exercise: Exercise;
    sets: Set[];
}

export interface WorkoutTemplate {
    _id?: string;
    name: string;
    exercises: ExerciseTemplate[];
}

export function jsonToWorkout(workoutData: any): WorkoutTemplate {
    const workout: WorkoutTemplate = {
        _id: workoutData._id,
        name: workoutData.name,
        exercises: workoutData.exercises.map((exerciseData: any) => {
            const exercise: ExerciseTemplate = {
                exercise: exerciseData.exercise,
                sets: exerciseData.sets.map((setData: any) => {
                    const set: Set = {
                        reps: setData.reps,
                        weight: setData.weight,
                        warmup: setData.warmup
                    };
                    return set;
                })
            };
            return exercise
        })
    };
    return workout;
}

export function jsonToExercise(exerciseData: any): Exercise {
    const exercise: Exercise = {
        _id: exerciseData._id,
        name: exerciseData.name
    }
    return exercise;
}
