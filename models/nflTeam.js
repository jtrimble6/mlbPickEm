const mongoose = require('mongoose')
const Schema = mongoose.Schema

const nflTeamSchema = new Schema({
    teamName: { type: String, required: true },
    teamAlias: { type: String, required: true },
    logo: { type: String, required: true },
    status: { type: String, required: true },
    homeGames: { type: Array, required: true },
    awayGames: { type: Array, required: true },
    division: { type: String, required: true },
    value: { type: Number, required: true, default: 0 },
    tier: { type: String, required: true },
    valueWeek: { type: Number, required: true },
    valueSet: { type: Date, required: false, default: Date.now }
})

const NflTeam = mongoose.model('NflTeam', nflTeamSchema)

module.exports = NflTeam;