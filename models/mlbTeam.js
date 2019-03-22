const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mlbTeamSchema = new Schema({
    teamName: { type: String, required: true },
    teamAlias: { type: String, required: true },
    homeGames: { type: Array, required: true },
    awayGames: { type: Array, required: true }
})

const MlbTeam = mongoose.model('MlbTeam', mlbTeamSchema)

module.exports = MlbTeam;