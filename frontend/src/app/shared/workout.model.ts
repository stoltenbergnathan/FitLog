export interface Set {
    reps: number;
    weight: number;
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

export interface WorkoutInstance {
    _id?: string;
    template: WorkoutTemplate;
    completedExercises: ExerciseTemplate[]
    timeTaken: string
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
                    };
                    return set;
                })
            };
            return exercise
        })
    };
    return workout;
}

export function jsonToWorkoutInstance(workoutInstanceData: any): WorkoutInstance {
    const workoutInstance: WorkoutInstance = {
        _id: workoutInstanceData._id,
        template: jsonToWorkout(workoutInstanceData.template),
        completedExercises: workoutInstanceData.completedExercises.map((exerciseData: any) => {
            const exercise: ExerciseTemplate = {
                exercise: exerciseData.exercise,
                sets: exerciseData.sets.map((setData: any) => {
                    const set: Set = {
                        reps: setData.reps,
                        weight: setData.weight,
                    };
                    return set;
                })
            };
            return exercise
        }),
        timeTaken: workoutInstanceData.timeTaken
    }
    return workoutInstance;
}

export function jsonToExercise(exerciseData: any): Exercise {
    const exercise: Exercise = {
        _id: exerciseData._id,
        name: exerciseData.name
    }
    return exercise;
}
