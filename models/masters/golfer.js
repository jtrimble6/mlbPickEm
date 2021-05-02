const mongoose = require('mongoose')
const Schema = mongoose.Schema

const golferSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: Number, required: true },
    rounds: { type: Array, required: true },
    score: { type: Number, required: true }
})

const Golfer = mongoose.model('Golfer', golferSchema)

module.exports = Golfer;