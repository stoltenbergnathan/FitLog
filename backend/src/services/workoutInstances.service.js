const { WorkoutInstance } = require('../models/workout.model')

async function getMultiple() {
    try {
        const allWorkoutInstances = await WorkoutInstance.find()
            .populate('completedExercises.exercise')
            .populate('template');
        return allWorkoutInstances;
    } catch (error) {
        console.error("Error getting workout instances: ", error);
        throw error;
    }
}

async function create(workoutInstanceData) {
    try {
        const createdWorkoutInstance = await WorkoutInstance.create(workoutInstanceData);
        return createdWorkoutInstance            
            .populate('completedExercises.exercise')
            .populate('template');
    } catch (error) {
        console.error("Error creating workout instance: ", error);
        throw error;
    }
}

// async function update(workoutId, workoutData) {
//     try {
//         const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, workoutData, { new: true });
//         return updatedWorkout;
//     } catch (error) {
//         console.error("Error updating workout: ", error);
//         throw error;
//     }
// }

async function remove(workoutInstanceId) {
    try {
        const deletedWorkoutInstance = await WorkoutInstance.findByIdAndDelete(workoutInstanceId);
        return deletedWorkoutInstance;
    } catch (error) {
        console.error("Error deleting workout instance: ", error);
        throw error;
    }
}

module.exports = {
    getMultiple,
    create,
    remove,
}