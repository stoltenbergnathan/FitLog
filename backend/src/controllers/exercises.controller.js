const exercises = require('../services/exercises.service')

async function get(req, res, next) {
    try {
        res.json(await exercises.getMultiple())
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function getOneById(req, res, next) {
    try {
        res.json(await exercises.getOneById(req.params.id))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function getOneByName(req, res, next) {
    try {
        res.json(await exercises.getOneByName(req.params.name))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function create(req, res, next) {
    try {
        res.json(await exercises.create(req.body))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function update(req, res, next) {
    try {
        res.json(await exercises.update(req.params.id, req.body))
    } catch (err) {
        console.error(err)
        next(err)
    }
}

async function remove(req, res, next) {
    try {
        res.json(await exercises.remove(req.params.id))
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
    remove
}