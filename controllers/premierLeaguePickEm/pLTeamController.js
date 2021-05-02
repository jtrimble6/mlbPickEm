const db = require('../../models')

module.exports = {
    findAll: function(req, res) {
        db.PLTeam
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.PLTeam
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
        db.PLTeam
          .find(
            { teamAlias: req.params.abbr }
          )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      },
      findOneAndUpdate: function(req, res) {
          db.PLTeam
            .update(
                { teamAlias: req.params.abbr },
                { $push: { awayGames: req.body }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      },
      create: function(req, res) {
          db.PLTeam
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      }
  }
  