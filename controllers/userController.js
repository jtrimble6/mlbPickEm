const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.User
          .find({})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findById: function(req, res) {
        console.log('find by id')
        console.log(req.params)
        db.User
          .find({username: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    addChallenge: function (req, res) {
        db.User
          .update({ username: req.params.id }, 
            { $push: { challenges: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    addWin: function(req, res) {
        db.User
          .update({ username: req.params.id }, 
            { $push: { wins: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.User
          .findById({ _id: req.params.id})
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
}
