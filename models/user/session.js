const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    sessionUserId: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Session = mongoose.model('session', sessionSchema )

module.exports = Session;