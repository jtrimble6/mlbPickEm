const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.NbaPlayoffTeam
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.NbaPlayoffTeam
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
        db.NbaPlayoffTeam
          .find(
            { teamAlias: req.params.abbr }
          )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      },
      findOneAndUpdate: function(req, res) {
          db.NbaPlayoffTeam
            .update(
                { teamAlias: req.params.abbr },
                { $push: { awayGames: req.body }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      },
      create: function(req, res) {
          db.NbaPlayoffTeam
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      }
  }
  