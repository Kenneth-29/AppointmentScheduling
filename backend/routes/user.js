const express = require('express')

// controllers
const {  loginAgent, signupAgent } = require('../controllers/userController')

const router = express.Router()


// agent login
router.post('/login', loginAgent)

// agent 
router.post('/register', signupAgent)

module.exports = router