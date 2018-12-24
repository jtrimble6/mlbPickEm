const db = require('../models')

module.exports = {
    findAll: function(req, res) {
        db.Game
          .find({})
          .then(dbModel => res.json(dbModel))
    },
    findById: function(req, res) {
        console.log('find by id')
        console.log(req.params)
        db.Game
          .find({gameId: req.params.id})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    findOneAndUpdate: function (req, res) {
        
    },
    finedOneAndDelete: function (req, res) {
        
    },
    create: function(req, res) {
        db.Game
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err))
    },
    // remove: function(req, res) {
    //     db.Game
    //       .findById({ _id: req.params.id})
    //       .then(dbModel => dbModel.remove())
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err));
    // }
}
