const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const messageBoardSchema = new Schema({
    admin: { type: Boolean, required: true, default: false },
    username: { type: String, required: true },
    type: { type: String, required: true },
    text: { type: String, required: false },
    date: { type: Date, required: true, default: Date.now },
})

const MessageBoard = mongoose.model('MessageBoard', messageBoardSchema)

module.exports = MessageBoard;