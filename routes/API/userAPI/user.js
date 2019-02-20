const router = require("express").Router();
const userController = require("../../../controllers/userController");
const passport = require("../../../server/passport");
const express = require("express");

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
  .put(userController.findOneAndUpdate)
  .post(userController.addWin)
//   .delete(userController.findOneAndDelete)

router.route('/:id/teams')
  .get(userController.getUserTeams)

router.route('/:id/teams/:team')
  .put(userController.changeStatus)
  
// router.route('/:id/:date')
//   .delete(userController.findOneAndDelete)



module.exports = router;