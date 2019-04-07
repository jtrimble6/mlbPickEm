const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.Challenge
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        console.log('find by id')
        console.log(req.params)
        db.Challenge
          .find({ _id: req.params.id })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findByUsername: function(req, res) {
      db.Challenge
        .find({ _id: req.params.id }, 
          { $where: { 'users': { 'username': req.params.username} } })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    addUser: function (req, res) {
        db.Challenge
          .update({ _id: req.params.id }, 
            { $push: { users: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    addUserWin: function(req, res) {
      db.Challenge
        .update({ _id: req.params.id , 'users.username': req.params.user } ,
          { $push: { 'users.$.wins': req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    addUserPick: function(req, res) {
      db.Challenge
        .update({ _id: req.params.id , 'users.username': req.params.user } ,
          { $push: { 'users.$.picks': req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    removeUserPick: function(req, res) {
      db.Challenge
        .update(
            { _id: req.params.id , 'users.username': req.params.user } ,
            { $pull: { 'users.$.picks': {'gameDate': req.params.date } } },
            { multi: true }
          ) 
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    addGames: function (req, res) {
        db.Challenge
          .find({ _id: req.params.id },
            $set({ games: req.body }))
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    addGolfers: function (req, res) {
      db.Challenge
        .find({ _id: req.params.id },
          $set({ teams: req.body }))
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    addWinner: function(req, res) {
        db.Challenge
          .update({ username: req.params.id }, 
            { $push: { winner: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Challenge
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.Challenge
        .update({ _id: req.params.id },
          { $set: { 'challengeStatus': 'inactive' }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }
}
