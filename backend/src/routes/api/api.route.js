const express = require('express');
const router = express.Router();

const workoutsRouter = require('./workouts.route');
const exercisesRouter = require('./exercises.route');
const workoutInstancesRouter = require('./workoutInstances.route');


router.use('/workouts', workoutsRouter);
router.use('/exercises', exercisesRouter);
router.use('workoutInstancs', workoutInstancesRouter);

module.exports = router;