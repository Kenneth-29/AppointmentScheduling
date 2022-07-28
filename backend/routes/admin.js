const express = require('express')

const {loginAdmin, newAdmin} = require('../controllers/adminController')

const router = express.Router()

router.post('/adminLogin', loginAdmin)

router.post('/newAdmin', newAdmin)

module.exports = router