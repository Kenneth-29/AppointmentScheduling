const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const loginAdmin = async (req, res) => {
    const {username, password} = req.body

    try {
        const admin = await Admin.login(username, password)
        const token = createToken(admin._id)

        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const newAdmin = async (req, res) => {
    const {username, password} = req.body

    try {
        const admin = await Admin.signup(username, password)
        const token = createToken(admin._id)

        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {loginAdmin, newAdmin}