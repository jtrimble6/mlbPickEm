const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nbaGameSchema = new Schema({
    gameId: { type: String, required: true },
    homeTeam: { type: String, required: true },
    awayTeam: { type: String, required: true },
    homeAlias: { type: String, required: true },
    awayAlias: { type: String, required: true },
    gameStatus: { type: String, required: true },
    gameDate: { type: String, required: true },
    gameTime: { type: Date, required: true },
    gameResult: { type: Object, required: true}
})

const NbaGame = mongoose.model('NbaGame', nbaGameSchema)

module.exports = NbaGame;