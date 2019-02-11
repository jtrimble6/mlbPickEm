const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.Team
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.Team
          .find({teamId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
      db.Team
        .find(
          { teamAlias: req.params.abbr }
        )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function(req, res) {
        db.Team
          .update(
              { teamAlias: req.params.abbr },
              { $push: { awayGames: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Team
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    }
}
