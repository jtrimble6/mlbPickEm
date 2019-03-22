const router = require("express").Router();
const teamController = require("../../../../controllers/mlbPickEm/mlbPickEmTeamController");

router.route('/')
  .post(teamController.create)
  .get(teamController.findAll)
  

router.route('/:abbr')
  .get(teamController.findByTeam)
  .put(teamController.findOneAndUpdate)

// router.route('/:team')
//   .get(teamController.findbyTeam)

// router.route('/:team/:id')
//   .get(teamController.findById)
//   .put(teamController.findOneAndUpdate)

module.exports = router;