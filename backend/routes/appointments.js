const express = require('express')

const{
    getAppointments,
    getAppointment,
    createAppointment,
    assignAgent,
    getAssignedAppointments
} = require('../controllers/appointmentController')

// const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// router.use(requireAuth)

//  GET all appointments
router.get('/', getAppointments)

// GET assigned appointments
router.get('/assigned', getAssignedAppointments)

// GET single appointment
router.get('/:id', getAppointment)

// POST new appointment
router.post('/', createAppointment)

// UPDATE appointment
router.put('/:id', assignAgent)

module.exports = router