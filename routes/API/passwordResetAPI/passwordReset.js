const router = require("express").Router();
const passwordResetController = require("../../../controllers/user/passwordResetController");
// const express = require("express");

router.route("/")
  .put(passwordResetController.addToken)
//   .get(passwordResetController.findAll)

router.route('/:username')
  .put(passwordResetController.addToken)

router.route('/:username/:token')
  .get(passwordResetController.getToken)
  

module.exports = router;