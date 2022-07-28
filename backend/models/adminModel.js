const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

adminSchema.statics.signup = async function (username, password){
    // validation
    if(!username || !password){
        throw Error ('Please fill in all fields')
    }

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = await this.create({
        username,
        password: hash
    })

    return admin
}

adminSchema.statics.login = async function (username, password){
    // validation
    if(!username || !password){
        throw Error ('Please fill in all fields')
    }

    const admin = await this.findOne({ username })

    if (!admin) {
        throw Error('Username does not exist')
    }

    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) {
        throw Error('Password is incorrect')
    }

    return admin
}
module.exports = mongoose.model('Admin', adminSchema)