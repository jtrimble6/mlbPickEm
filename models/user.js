const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
    admin: { type: Boolean, required: false, default: false },
    position: { type: String, required: false, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    favoriteTeam: { type: String, required: false },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    passwordResetToken: { type: String, required: false, default: ''},
    passwordResetExp: { type: Date, required: false, default: ''},
    date: { type: Date, default: Date.now },
    challenges: { type: Array, default: [] },
    wins: { type: Array, default: [] }
})

userSchema.methods = {
    checkPassword: function (inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 10)
    }
};

userSchema.pre('save', function (next) {

    // HASH PASSWORD WHEN NEW USER CREATED
    if (!this.password) {
        console.log('models/user.js ***NO PASSWORD PROVIDED***')
        next()
    } else {
        console.log('models/user.js hashPassword in pre-save')
        this.password = this.hashPassword(this.password)
        next()
    }
});

userSchema.pre('findOneAndUpdate', function (next) {

    // HASH PASSWORD IF MODIFIED
    const password = this.getUpdate().$set.password;
        if (!password) {
            return next();
        }
        try {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);
            this.getUpdate().$set.password = hash;
            next();
        } catch (error) {
            return next(error);
        }

});

// userSchema.pre('findOneAndUpdate', function(next) {
//     const user = this
//     if (!user.isModified('password')) return next();
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });
// })

const User = mongoose.model('User', userSchema)

module.exports = User;