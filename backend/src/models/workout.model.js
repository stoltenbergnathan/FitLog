const mongoose = require('mongoose');

const SetSchema = new mongoose.Schema(
    {
        reps: { type: Number, required: true, min: 0 },
        weight: { type: Number, required: true, min: 0 },
        warmup: { type: Boolean, required: true, default: false }
    },
    {
        _id: false
    }
);

const ExerciseSchema = new mongoose.Schema(
    {
        name: { type: String, required: true }
    }
);

const TrackedExerciseSchema = new mongoose.Schema(
    {
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
        sets: [SetSchema]
    },
    {
        _id: false
    }
);

const WorkoutSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        exercises: [TrackedExerciseSchema]
    },
    {
        timestamps: true
    }
);

const WorkoutInstanceSchema = new mongoose.Schema(
    {
        template: { type: mongoose.Schema.Types.ObjectId, ref: "Workout", required: true},
        completedExercises: [TrackedExerciseSchema],
        timeTaken: { type: String, required: true}
    },
    {
        timestamps: true
    }
);

const Workout = mongoose.model('Workout', WorkoutSchema);
const Exercise = mongoose.model('Exercise', ExerciseSchema);
const WorkoutInstance = mongoose.model('WorkoutInstance', WorkoutInstanceSchema);

module.exports = { Workout, Exercise, WorkoutInstance };
