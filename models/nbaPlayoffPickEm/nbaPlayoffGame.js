const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nbaPlayoffGameSchema = new Schema({
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

const NbaPlayoffGame = mongoose.model('NbaPlayoffGame', nbaPlayoffGameSchema)

module.exports = NbaPlayoffGame;