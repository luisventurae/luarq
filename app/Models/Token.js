'use strict'

/**
 * Modelo Colección Token
 */

const { Schema, model, Types } = require('mongoose')
const ObjectId = Types.ObjectId

const Token = new Schema({
    token: { type: String, required: true },
    is_revoked: { type: Boolean, required: true },
    userId: { type: ObjectId, required: true },
}, { timestamps: true })

module.exports = model('tokens', Token)