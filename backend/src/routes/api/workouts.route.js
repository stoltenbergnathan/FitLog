const express = require('express')
const router = express.Router()
const workoutsController = require('../../controllers/workouts.controller')

router.get('/', workoutsController.get)

router.get('/:id', workoutsController.getOneById)

router.get('/name/:name', workoutsController.getOneByName)

router.post('/', workoutsController.create)

router.post('/:id/addExercises', workoutsController.addExercises)

router.put('/', workoutsController.update)

router.delete('/:id', workoutsController.remove)

module.exports = router