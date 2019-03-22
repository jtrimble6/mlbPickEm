const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.Admin
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        console.log('find by id')
        console.log(req.params)
        db.Admin
          .find({username: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    addPosition: function (req, res) {
        db.Admin
          .update({username: req.params.id}, 
            { $push: { position: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    addAccess: function(req, res) {
        db.Admin
          .update({ username: req.params.id }, 
            { $push: { access: req.body }})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Admin
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    remove: function(req, res) {
        db.Admin
          .findById({ _id: req.params.id})
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    }
}
