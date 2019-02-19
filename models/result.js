const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({
    gameId: { type: String, required: true },
    winner: { type: String, required: true },
    gameDate: { type: Date, required: true },
    usernames: { type: Array, required: true }
})

const Result = mongoose.model('Result', resultSchema)

module.exports = Result;