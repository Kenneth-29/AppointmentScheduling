const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {

    // check if user is authenticated
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({
            error: 'Auth token is missing'
        })
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById({_id}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request not authorized'})
    }
}

module.exports = requireAuth