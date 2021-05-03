const db = require('../../models')

module.exports = {
    findAll: function(req, res) {
        db.NbaTeam
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.NbaTeam
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
        db.NbaTeam
          .find(
            { teamAlias: req.params.abbr }
          )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
      },
      findOneAndUpdate: function(req, res) {
          db.NbaTeam
            .update(
                { teamAlias: req.params.abbr },
                // { $push: { homeGames: req.body }},
                { $push: { awayGames: req.body }}
                )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      },
      findOneAndEmpty: function(req, res) {
        db.NbaTeam
          .update(
              { teamAlias: req.params.abbr },
              { $pull: { homeGames: {$exists: true} }})
              // { $pull: { awayGames: {$exists: true} }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
      create: function(req, res) {
          db.NbaTeam
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
      }
  }
  