const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const adminSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: false },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    access: { type: Array, default: [] }
})

adminSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
};

adminSchema.pre('save', function (next) {
    if (!this.password) {
        console.log('models/user.js ***NO PASSWORD PROVIDED***')
        next()
    } else {
        console.log('models/user.js hashPassword in pre-save')
        this.password = this.hashPassword(this.password)
        next()
    }
});

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin;