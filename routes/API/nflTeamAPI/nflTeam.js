const router = require("express").Router();
const nflTeamController = require("../../../controllers/nflPickEm/nflTeamController");

router.route('/')
  .get(nflTeamController.findAll)
  .post(nflTeamController.create)
  

// router.route('/:id')
//   .get(nflTeamController.findById)
//   .put(nflTeamController.findOneAndUpdate)

router.route('/:abbr')
  .get(nflTeamController.findByTeam)
  .put(nflTeamController.findOneAndUpdate)


module.exports = router;