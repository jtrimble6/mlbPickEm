const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nbaPlayoffTeamSchema = new Schema({
    teamName: { type: String, required: true },
    teamAlias: { type: String, required: true },
    homeGames: { type: Array, required: true },
    awayGames: { type: Array, required: true }
})

const NbaPlayoffTeam = mongoose.model('NbaPlayoffTeam', nbaPlayoffTeamSchema)

module.exports = NbaPlayoffTeam;