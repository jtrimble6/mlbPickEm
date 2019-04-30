const router = require("express").Router();
const updatePasswordController = require("../../../controllers/updatePasswordController");
// const express = require("express");

// router.route("/")
//   .put(updatePasswordController.updatePassword)
//   .get(updatePasswordController.findAll)

router.route('/:username')
  .put(updatePasswordController.updatePassword)

  

module.exports = router;