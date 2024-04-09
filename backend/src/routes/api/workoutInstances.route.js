const express = require('express');
const router = express.Router();
const workoutInstancesController = require('../../controllers/workoutInstances.controller');

router.get('/', workoutInstancesController.get);

router.post('/', workoutInstancesController.create);

router.delete('/:id', workoutInstancesController.remove);

module.exports = router;