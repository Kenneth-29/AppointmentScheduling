const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,   
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

// Static method | Signup
userSchema.statics.signup = async function (name, email, password){

    // validation
    if(!name || !email || !password){
        throw Error ('Please fill in all fields')
    }
    if (!validator.isEmail(email)){
        throw Error ('Please enter a valid email')
    }
    if (!validator.isLength(password)){
        throw Error ('Please enter a strong password')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({
        name,
        email,
        password: hash
    })

    return user
}

// static method | Login
userSchema.statics.login = async function (email, password){
    
        // validation
        if(!email || !password){
            throw Error ('Please fill in all fields')
        }
        
        const user = await this.findOne({ email })
    
        if (!user) {
            throw Error('Email not found')
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if (!isMatch) {
            throw Error('Incorrect password')
        }
    
        return user
}

module.exports = mongoose.model('User', userSchema)