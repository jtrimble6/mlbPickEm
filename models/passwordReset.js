const mongoose = require('mongoose')
const Schema = mongoose.Schema

const passwordResetSchema = new Schema({
    username: { type: String, required: true },
    passwordResetToken: { type: String, required: true },
    passwordResetExp: { type: Date, required: true }
})

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema)

module.exports = PasswordReset;