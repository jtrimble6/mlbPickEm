const db = require('../models')
require('dotenv').config();


module.exports = {
    updatePassword: function(req, res) {
      db.User
        .findOneAndUpdate(
          { username: req.params.username },
          { $set: { password: req.body.newPassword } }
        )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }  
}