const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mlbPickEmUserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    date: {type: Date, default: Date.now },
    picks: { type: Array, default: [] },
    wins: { type: Array, default: [] },
    teams: { type: Array, required: true }
})

const mlbPickEmUser = mongoose.model('mlbPickEmUser', mlbPickEmUserSchema)

module.exports = mlbPickEmUser;