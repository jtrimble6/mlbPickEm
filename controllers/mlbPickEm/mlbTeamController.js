const db = require('../../models')

module.exports = {
    findAll: function(req, res) {
        db.MlbTeam
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.MlbTeam
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
        db.MlbTeam
          .find(
            { teamAlias: req.params.abbr }
          )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      },
      findOneAndUpdate: function(req, res) {
          db.MlbTeam
            .update(
                { teamAlias: req.params.abbr },
                { $push: { homeGames: req.body }})
                // { $push: { awayGames: req.body }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      },
      create: function(req, res) {
          db.MlbTeam
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      }
  }
  