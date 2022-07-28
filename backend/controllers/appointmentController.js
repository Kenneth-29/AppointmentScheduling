const Appointment = require('../models/appointmentModel')

const mongoose = require('mongoose')

//Get all appointments
const getAppointments = async (req, res) => {
    const appointments = await Appointment.find({}).sort({ date: -1 })

    res.status(200).json(appointments)
}

// Get a single appointment
const getAppointment = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid ID' })
    }

    const appointment = await Appointment.findById(id)

    if(!appointment) {
        res.status(404).json({ message: 'Appointment not found' })
    }

    res.status(200).json(appointment)
}

// Get assigned appointments
const getAssignedAppointments = async (req, res) => {

    const email = req.user.email
    const appointments = await Appointment.find({ assignedAgent: { email } }).sort({ date: -1 })

    res.status(200).json(appointments)
}

//create appointment

const createAppointment = async (req, res) => {
    const { clientName, clientPhone, clientEmail, appointmentDate, appointmentTime, appointmentType, numberOfAttendees} = req.body

    let emptyFields = []

    if(!clientName) {
        emptyFields.push('clientName')
    }
    if(!clientPhone) {
        emptyFields.push('clientPhone')
    }
    if(!clientEmail) {
        emptyFields.push('clientEmail')
    }
    if(!appointmentDate) {
        emptyFields.push('appointmentDate')
    }
    if(!appointmentTime) {
        emptyFields.push('appointmentTime')
    }
    if(!appointmentType) {
        emptyFields.push('appointmentType')
    }
    if(!numberOfAttendees) {
        emptyFields.push('numberOfAttendees')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields error', emptyFields })
    }

    // add the new appointment to the database
    try {

        const appointment = await Appointment.create({ clientName, clientPhone, clientEmail, appointmentDate, appointmentTime, appointmentType, numberOfAttendees })
        res.status(200).json(appointment)

    } catch (error) {

        res.status(500).json({ error: error.message })

    }
        
    }

//assign agent to appointment (UPDATE)
const assignAgent = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Invalid ID' })
    }

    const appointment = await Appointment.findByIdAndUpdate({ _id: id }, { ...req.body })

    if(!appointment) {
        res.status(404).json({ message: 'Appointment not found' })
    }

    res.status(200).json(appointment)
}

//TODO: delete appointment

module.exports = {
    getAppointments,
    getAppointment,
    createAppointment,
    assignAgent,
    getAssignedAppointments
}