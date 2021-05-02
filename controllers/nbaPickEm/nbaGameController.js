const db = require('../../models')

module.exports = {
    findAll: function(req, res) {
        db.NbaGame
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.NbaGame
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByDate: function(req, res) {
        db.NbaGame
          .find(
              { gameDate: req.params.date }
            )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
      db.NbaGame
        .find(
            { homeAlias: req.params.team },
            // { awayAlias: req.params.team }
        )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function (req, res) {
        db.NbaGame
          .updateOne(
              { gameDate: req.params.date, gameId: req.params.id }, 
              { $set: { gameResult: req.body } }
            )
          .then(dbModel => {res.json(dbModel)})
          .catch(err => {res.status(422).json(err)})
    },
    findOneAndDelete: function (req, res) {
        
    },
    create: function(req, res) {
        db.NbaGame
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    // remove: function(req, res) {
    //     db.NbaGame
    //       .findById({ _id: req.params.id})
    //       .then(dbModel => dbModel.remove())
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    // }
}
