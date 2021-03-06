const router = require("express").Router();
const userController = require("../../../controllers/user/userController");
const passport = require("../../../server/userPassport");
// const express = require("express");

router.route("/")
  .post(userController.create)
  .get(userController.findAll)

// router.route("/login")
//   .post(userController.findByUsernamePassword)

router.post(
  '/login',
  function (req, res, next) {
      console.log("logging in");
      console.log('routes/user.js, login, req.body: ');
      console.log(req.body)
      next()
  },
  passport.authenticate('local'),
  (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
          username: req.user.username
      };
      res.send(userInfo);
  }
)


router.get('/', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
      res.json({ user: req.user })
  } else {
      res.json({ user: null })
  }
})

router.route('/:id')
  .get(userController.findById)
  .post(userController.addPick)
  .put(userController.addChallenge)

router.route('/find/:challengeId')
  .get(userController.findByChallenge)

router.route('/:id/:gameId/:result')
  .put(userController.updatePick)

router.route('/update/:id/:challengeId/:gameDate')
  .put(userController.overridePick)
  
//   .delete(userController.findOneAndDelete)

// router.route('/:id/teams')
//   .get(userController.getUserTeams)

// router.route('/:id/picks/:status')
//   .put(userController.updatePick)
  
// router.route('/:id/:date')
//   .delete(userController.findOneAndDelete)
//   .get(userController.findByDate)



module.exports = router;