const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mlbPickEmSchema = new Schema({
    challengeId: { type: String, required: true },
    users: { type: Array, required: true },
    teams: { type: Array, required: true },
    games: { type: Array, required: true },
    startDate: { type: Date, required: true },
    sport: { type: String, required: true },
    status: { type: String, required: true, default: 'upcoming'},
    maxEntries: { type: Number, required: true }
})

const MlbPickEm = mongoose.model('MlbPickEm', mlbPickEmSchema)

module.exports = MlbPickEm