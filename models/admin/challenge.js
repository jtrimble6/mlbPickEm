const mongoose = require('mongoose')
const Schema = mongoose.Schema

const challengeSchema = new Schema({
    challengeName: { type: String, required: true },
    challengeStatus: { type: String, required: true },
    openSignUp: { type: Date, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true, default: Date.now() + 365*24*60*60000 },
    buyIn: { type: Number, required: true },
    maxEntries: { type: Number, required: true },
    url: { type: String, required: true },
    rulesUrl: { type: String, required: true },
    creator: { type: String, required: true },
    sport: { type: String, required: true },
    info: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    games: { type: Array, default: [] },
    teams: { type: Array, default: [] },
    users: { type: Array, default: [] },
    parLine: { type: Number, required: true, default: 0 },
    winner: { type: Array, default: [] },
    img: { type: String, required: false },
    password: { type: String, required: true, default: 'none' }
})

const Challenge = mongoose.model('Challenge', challengeSchema)

module.exports = Challenge;