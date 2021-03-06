const db = require('../../models')

module.exports = {
    findAll: function(req, res) {
        db.Golfer
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.Golfer
          .find({name: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function(req, res) {
        db.Golfer
        .update(
            { name: req.params.id },
            { $push: { rounds: req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Golfer
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }
  }
  