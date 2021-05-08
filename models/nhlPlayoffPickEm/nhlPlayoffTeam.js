const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nhlPlayoffTeamSchema = new Schema({
    teamName: { type: String, required: true },
    teamAlias: { type: String, required: true },
    homeGames: { type: Array, required: true },
    awayGames: { type: Array, required: true },
    conf: { type: String, required: true },
    seed: { type: String, required: true }
})

const NhlPlayoffTeam = mongoose.model('NhlPlayoffTeam', nhlPlayoffTeamSchema)

module.exports = NhlPlayoffTeam;