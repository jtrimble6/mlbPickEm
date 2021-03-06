const db = require('../../models')

module.exports = {
    findAll: function(req, res) {
        db.NflGame
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        db.NflGame
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByDate: function(req, res) {
        db.NflGame
          .find(
              { gameWeek: req.params.date }
            )
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByTeam: function(req, res) {
      db.NflGame
        .find(
            { homeAlias: req.params.team },
            // { awayAlias: req.params.team }
        )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function (req, res) {
        db.NflGame
          .update(
              { gameWeek: req.params.date, gameId: req.params.id }, 
              { $set: { gameResult: req.body } }
            )
          .then(dbModel => {res.json(dbModel)})
          .catch(err => {res.status(422).json(err)})
    },
    findOneAndDelete: function (req, res) {
        
    },
    create: function(req, res) {
        db.NflGame
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    // remove: function(req, res) {
    //     db.NflGame
    //       .findById({ _id: req.params.id})
    //       .then(dbModel => dbModel.remove())
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    // }
}
