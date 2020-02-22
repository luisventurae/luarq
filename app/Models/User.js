'use strict'

/**
 * Modelo Colección Usuario
 */

const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose')

const User = new Schema({
    username: { type: String, required: true, unique: true, dropDups: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
}, { timestamps: true })

User.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(13)) 
}

User.methods.comparePassword = (password, password_saved) => {
    return bcrypt.compareSync(password, password_saved)
}

module.exports = model('users', User)