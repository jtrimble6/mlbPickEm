const db = require('../models')

module.exports = {
    checkUserSession: function(req, res) {
        console.log("Checking user Session")
        console.log(req.params);
        console.log(req.params.id);
        db.UserSession
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    createUserSession: function(req, res) {
        console.log("create user Session");
        db.UserSession
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    logoutUserSession: function(req, res) {
        console.log('logout user')
        db.UserSession
          .deleteOne(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    }
     
}