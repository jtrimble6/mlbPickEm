const db = require('../../models')

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
    findByChallenge: function(req, res) {
      db.User
      .find({ 'challenges.challengeId': req.params.challengeId })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
    },
    // addToken: function(req, res) {
    //     db.User
    //       .update({ username: req.params.id },
    //         { $set: { resetPasswordToken: req.body }})
    //       .then(dbModel => res.json(dbModel))
    //       .catch(err => res.status(422).json(err))
    // },
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
    addPick: function(req, res) {
      db.User
        .update({ username: req.params.id }, 
          { $push: { picks: req.body }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    overridePick: function(req,res) {
      db.User
        .update(
            { 'username': req.params.id, 'picks.gameDate': req.params.gameDate, 'picks.challengeId': req.params.challengeId },
            { $set: { 'picks.$': req.body } }
          )
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    },
    updatePick: function(req, res) {
      db.User
      //   '_id': req.params.id, 
          //   // 'users.username': req.params.user, 
          //   'users': { $elemMatch: { username: req.params.user }},
          //   'picks': { $elemMatch: { gameId: req.params.gameId }}
          //   // 'picks.gameId': req.params.gameId 
          // },
          // { $set: { 'users.$.picks.$.result': req.params.result }}
        .update(
            { 'username': req.params.id, 'picks.gameId': req.params.gameId }, 
            { $set: { 'picks.$.result': req.params.result }}
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
