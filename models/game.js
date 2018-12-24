const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const gameSchema = new Schema({
    gameId: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    gameStatus: { type: String, required: true },
    gameDate: { type: Date, required: true }
})

const Game = mongoose.model('Game', gameSchema )

module.exports = Game