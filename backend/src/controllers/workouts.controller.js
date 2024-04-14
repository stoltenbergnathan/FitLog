const workouts = require('../services/workouts.service')

async function get(req, res, next) {
    try {
        res.json(await workouts.getMultiple())
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function getOneById(req, res, next) {
    try {
        res.json(await workouts.getOneById(req.params.id))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function getOneByName(req, res, next) {
    try {
        res.json(await workouts.getOneByName(req.params.name))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function create(req, res, next) {
    try {
        res.json(await workouts.create(req.body))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function update(req, res, next) {
    try {
        res.json(await workouts.update(req.body))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function remove(req, res, next) {
    try {
        res.json(await workouts.remove(req.params.id))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function addExercises(req, res, next) {
    try {
        res.json(await workouts.addExercises(req.params.id, req.body))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

module.exports = {
    get,
    getOneById,
    getOneByName,
    create,
    update,
    remove,
    addExercises
}