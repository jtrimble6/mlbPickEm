const router = require("express").Router();
const sessionController = require("../../../controllers/user/sessionController");

router.route("/")
  .post(sessionController.createUserSession)
  

router.route("/:id")
  .post(sessionController.createUserSession)
  .get(sessionController.checkUserSession)

// router.route("/checksession")
//   .get(sessionController.checkSession)

router.route("/logout")
  .delete(sessionController.logoutUserSession)

module.exports = router;