const router = require("express").Router();
const adminSessionController = require("../../../controllers/adminSessionController");

router.route("/")
  .post(adminSessionController.createAdminSession)

router.route("/:id")
  .get(adminSessionController.checkAdminSession)

// router.route("/checksession")
//   .get(adminSessionController.checkSession)

router.route("/logout")
  .delete(adminSessionController.logoutAdminSession)

module.exports = router;