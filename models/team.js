const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    teamName: { type: String, required: true },
    teamAlias: { type: String, required: true },
    homeGames: { type: Array, required: true },
    awayGames: { type: Array, required: true }
})

const Team = mongoose.model('Team', teamSchema)

module.exports = Team;