const Admin = require('../../models/admin')
const LocalStrategy = require('passport-local').Strategy

const adminStrategy = new LocalStrategy(
	{
		usernameField: 'username'
	},
	function(username, password, done) {
		Admin.findOne({ username: username }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!user.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = adminStrategy