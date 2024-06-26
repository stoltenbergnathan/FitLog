const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const apiRouter = require('./src/routes/api/api.route')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', apiRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
    } catch (err) {
        console.error(err)
    }
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

start()