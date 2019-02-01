const db = require('../models')
//const User = require('../models/user')
//const passport = require('../server/passport')

module.exports = {
    findOneAndIncrease: function(req, res) {
        db.User
          .update({ username: req.params.id }, 
            { $set: { points: req.params.amount }})
          .then(dbModel = res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    // findOneAndDelete: function (req, res) {
    //     db.User
    //       .update(
    //           { username: req.params.id }, 
    //           { $pull: { 'picks': { 'gameDate': req.params.date } } },
    //           { multi: true }
    //         )
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err))
    // },
}
