const router = require("express").Router();
const messageBoardController = require("../../../controllers/user/messageBoardController");
const express = require("express");

router.route("/")
  .post(messageBoardController.create)
  .get(messageBoardController.findAll)


// router.route('/:user')
//   .get(messageBoardController.findById)
//   .put(messageBoardController.addChallenge)
  
//   .delete(messageBoardController.findOneAndDelete)

// router.route('/:user/date')
//   .get(messageBoardController.getUserTeams)

module.exports = router;