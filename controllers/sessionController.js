const db = require('../models')

module.exports = {
    checkSession: function(req, res) {
        db.Session
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    create: function(req, res) {
        db.Session
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    logout: function(req, res) {
        console.log('logout')
    }
     
}