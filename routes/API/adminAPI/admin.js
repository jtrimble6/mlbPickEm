const router = require("express").Router();
const adminController = require("../../../controllers/adminController");
const passport = require("../../../server/adminPassport");
const express = require("express");

router.route("/")
  .post(adminController.create)
  .get(adminController.findAll)

// router.route("/login")
//   .post(adminController.findByUsernamePassword)

router.post(
  '/adminLogin',
  function (req, res, next) {
      console.log("logging in");
      console.log('routes/admin.js, login, req.body: ');
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
  .get(adminController.findById)
  // .put(adminController.findOneAndUpdate)
  
//   .delete(adminController.findOneAndDelete)

// router.route('/:id/teams')
//   .get(adminController.getUserTeams)

// router.route('/:id/picks/:status')
//   .put(adminController.updatePick)
  
// router.route('/:id/:date')
//   .delete(adminController.findOneAndDelete)

//   .get(adminController.findByDate)



module.exports = router;