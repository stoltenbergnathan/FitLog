const { Workout } = require('../models/workout.model')

async function getMultiple() {
    try {
        const allWorkouts = await Workout.find().populate('exercises.exercise');
        return allWorkouts;
    } catch (error) {
        console.error("Error getting workouts: ", error);
        throw error;
    }
}

async function getOneById(workoutId) {
    try {
        const workout = await Workout.findById(workoutId).populate('exercises.exercise');
        return workout;
    } catch (error) {
        console.error("Error getting workout by ID: ", error);
        throw error;
    }
}

async function getOneByName(workoutName) {
    try {
        const workout = await Workout.findOne({ name: workoutName });
        return workout;
    } catch (error) {
        console.error("Error getting workout by name:", error);
        throw error;
    }
}

async function create(workoutData) {
    try {
        const createdWorkout = await Workout.create(workoutData);
        return createdWorkout.populate('exercises.exercise');
    } catch (error) {
        console.error("Error creating workout: ", error);
        throw error;
    }
}

async function update(workoutData) {
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutData._id, workoutData, { new: true });
        return updatedWorkout.populate('exercises.exercise');
    } catch (error) {
        console.error("Error updating workout: ", error);
        throw error;
    }
}

async function remove(workoutId) {
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
        return deletedWorkout;
    } catch (error) {
        console.error("Error deleting workout: ", error);
        throw error;
    }
}

async function addExercises(workoutId, exercises) {
    try {
        const workout = await Workout.findById(workoutId);
        workout.exercises.push(...exercises);
        const updatedWorkout = await workout.save();
        return updatedWorkout
    } catch (error) {
        console.error("Error adding exercises to workout: ", error);
        throw error;
    }
}

module.exports = {
    getMultiple,
    getOneById,
    getOneByName,
    create,
    update,
    remove,
    addExercises
}