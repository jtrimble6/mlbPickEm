const router = require("express").Router();
const challengeController = require("../../../controllers/challengeController");

router.route('/')
  .get(challengeController.findAll)
  .post(challengeController.create)
  

router.route('/:id')
  .put(challengeController.addUser)
  .get(challengeController.findById)
  .delete(challengeController.remove)

// router.route('/:id/games')
//   .post(challengeController.addGames)

router.route('/:id/users/:user')
  .put(challengeController.addUserPick)
  .post(challengeController.addUserWin)
  

router.route('/:id/users/:user/:date')
  .delete(challengeController.removeUserPick)

// router.route("/checksession")
//   .get(challengeController.checkSession)

// router.route("/logout")
//   .delete(challengeController.logoutUserSession)

module.exports = router;