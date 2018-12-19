const router = require("express").Router();
const sessionController = require("../../../controllers/sessionController");

router.route("/")
  .post(sessionController.create)

router.route("/:id")
  .get(sessionController.checkSession)

// router.route("/checksession")
//   .get(sessionController.checkSession)

// router.route("/logout")
//   .get(sessionController.logOut)

module.exports = router;