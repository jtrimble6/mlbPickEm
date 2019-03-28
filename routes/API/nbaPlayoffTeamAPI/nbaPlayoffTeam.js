const router = require("express").Router();
const nbaPlayoffTeamController = require("../../../controllers/nbaPlayoffTeamController");

router.route('/')
  .get(nbaPlayoffTeamController.findAll)
  .post(nbaPlayoffTeamController.create)
  

// router.route('/:id')
//   .get(nbaPlayoffTeamController.findById)
//   .put(nbaPlayoffTeamController.findOneAndUpdate)

router.route('/:abbr')
.get(nbaPlayoffTeamController.findByTeam)
.put(nbaPlayoffTeamController.findOneAndUpdate)


module.exports = router;