const workoutInstances = require('../services/workoutInstances.service')

async function get(req, res, next) {
    try {
        res.json(await workoutInstances.getMultiple())
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function create(req, res, next) {
    try {
        res.json(await workoutInstances.create(req.body))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function remove(req, res, next) {
    try {
        res.json(await workoutInstances.remove(req.params.id))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

module.exports = {
    get,
    create,
    remove,
}