const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.Result
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    // findById: function(req, res) {
    //     db.Result
    //       .find({resultId: req.params.id})
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err))
    // },
    // findByUsers: function(req, res) {
    //   db.Result
    //     .find(
    //       { resultUsers: req.params.usernames }
    //     )
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err))
    // },
    // findOneAndUpdate: function(req, res) {
    //     db.Result
    //       .update(
    //           { resultGame: req.params.game },
    //           { $push: { username: req.body }})
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err))
    // },
    create: function(req, res) {
        db.Result
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    }
}
