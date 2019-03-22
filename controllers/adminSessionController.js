const db = require('../models')

module.exports = {
    checkAdminSession: function(req, res) {
        console.log("Checking Admin Session")
        console.log(req.params);
        console.log(req.params.id);
        db.AdminSession
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    createAdminSession: function(req, res) {
        console.log("create admin session");
        db.AdminSession
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    logoutAdminSession: function(req, res) {
        console.log('logout admin')
        db.AdminSession
          .deleteOne(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    }
     
}