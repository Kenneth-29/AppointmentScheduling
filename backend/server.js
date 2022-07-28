require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const appointmentRoutes = require('./routes/appointments')
const userRoutes = require('./routes/user')
const adminRoute = require('./routes/admin')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/appointments', appointmentRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoute)

//db connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and Listening on port', process.env.PORT)
        })
    })
        .catch((error) => {
            console.log(error)
        })