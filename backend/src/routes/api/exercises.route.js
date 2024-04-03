const express = require('express')
const router = express.Router()
const exercisesController = require('../../controllers/exercises.controller')

router.get('/', exercisesController.get)

router.get('/:id', exercisesController.getOneById)

router.get('/name/:name', exercisesController.getOneByName)

router.post('/', exercisesController.create)

router.put('/', exercisesController.update)

router.delete('/:id', exercisesController.remove)

module.exports = router