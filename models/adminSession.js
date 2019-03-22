const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adminSessionSchema = new Schema({
    sessionAdminId: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const AdminSession = mongoose.model('adminSession', adminSessionSchema )

module.exports = AdminSession;