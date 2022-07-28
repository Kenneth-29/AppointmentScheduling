const mongoose = require('mongoose')

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    appointmentType: {
        type: String,
        required: true
    },
    numberOfAttendees: {
        type: Number,
        required: true
    },
assignedAgent: {
    type: String,
}})

module.exports = mongoose.model('Appointment', appointmentSchema)