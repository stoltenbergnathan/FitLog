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

const WorkoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: [TrackedExerciseSchema]
});

const ExerciseHistorySchema = new mongoose.Schema({
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
    exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
    reps: { type: Number, required: true, min: 0 },
    weight: { type: Number, required: true, min: 0 },
    warmup: { type: Boolean, required: true, default: false },
    date: { type: Date, required: true, default: new Date().toString() }
});

const Workout = mongoose.model('Workout', WorkoutSchema);
const Exercise = mongoose.model('Exercise', ExerciseSchema);
const ExerciseHistory = mongoose.model('ExerciseHistory', ExerciseHistorySchema);

module.exports = { Workout, Exercise, ExerciseHistory };
