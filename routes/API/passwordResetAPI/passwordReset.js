const router = require("express").Router();
const passwordResetController = require("../../../controllers/passwordResetController");
// const express = require("express");

router.route("/")
  .put(passwordResetController.addToken)
//   .get(passwordResetController.findAll)

router.route('/:id')
  .put(passwordResetController.addToken)
  .get(passwordResetController.getToken)
  

module.exports = router;