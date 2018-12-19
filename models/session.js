const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sessionSchema = new Schema({
    sessionUserID: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Session = mongoose.model('Session', sessionSchema )

module.exports = Session;