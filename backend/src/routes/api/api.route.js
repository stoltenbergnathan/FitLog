const express = require('express')
const router = express.Router()

const workoutsRouter = require('./workouts.route')
const exercisesRouter = require('./exercises.route')


router.use('/workouts', workoutsRouter)
router.use('/exercises', exercisesRouter)

module.exports = router;