const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nbaTeamSchema = new Schema({
    teamName: { type: String, required: true },
    teamAlias: { type: String, required: true },
    homeGames: { type: Array, required: true },
    awayGames: { type: Array, required: true }
})

const NbaTeam = mongoose.model('NbaTeam', nbaTeamSchema)

module.exports = NbaTeam;