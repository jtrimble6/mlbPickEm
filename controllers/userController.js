const db = require('../models')
//const User = require('../models/user')
//const passport = require('../server/passport')

module.exports = {
    findAll: function(req, res) {
        db.User
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        console.log('find by id')
        console.log(req.params)
        db.User
          .find({username: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function (req, res) {
        db.User
          .update({username: req.params.id}, { $push: { picks: req.body}})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findOneAndDelete: function (req, res) {
        db.User
          .update(
              { username: req.params.id }, 
              { $pull: { 'picks': { 'gameDate': req.params.date } } },
              { multi: true }
            )
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
