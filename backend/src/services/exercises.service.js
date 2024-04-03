const { Exercise } = require('../models/workout.model')

async function getMultiple() {
    try {
        const allExercises = await Exercise.find();
        return allExercises;
    } catch (error) {
        console.error("Error getting exercises: ", error);
        throw error;
    }
}

async function getOneById(exerciseId) {
    try {
        const exercise = await Exercise.findById(exerciseId);
        return exercise;
    } catch (error) {
        console.error("Error getting exercise by ID: ", error);
        throw error;
    }
}

async function getOneByName(exerciseName) {
    try {
        const exercise = await Exercise.findOne({ name: exerciseName });
        return exercise;
    } catch (error) {
        console.error("Error getting exercise by name:", error);
        throw error;
    }
}

async function create(exerciseData) {
    try {
        const createdExercise = await Exercise.create(exerciseData);
        return createdExercise;
    } catch (error) {
        console.error("Error creating exercise: ", error);
        throw error;
    }
}

async function update(exerciseId, exerciseData) {
    try {
        const updatedExercise = await Exercise.findByIdAndUpdate(exerciseId, exerciseData, { new: true });
        return updatedExercise;
    } catch (error) {
        console.error("Error updating exercise: ", error);
        throw error;
    }
}

async function remove(exerciseId) {
    try {
        const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
        return deletedExercise;
    } catch (error) {
        console.error("Error deleting exercise: ", error);
        throw error;
    }
}

module.exports = {
    getMultiple,
    getOneById,
    getOneByName,
    create,
    update,
    remove
}