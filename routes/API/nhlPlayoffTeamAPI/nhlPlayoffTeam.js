const router = require("express").Router();
const nhlPlayoffTeamController = require("../../../controllers/nhlPlayoffPickEm/nhlPlayoffTeamController");

router.route('/')
  .get(nhlPlayoffTeamController.findAll)
  .post(nhlPlayoffTeamController.create)
  

// router.route('/:id')
//   .get(nhlPlayoffTeamController.findById)
//   .put(nhlPlayoffTeamController.findOneAndUpdate)

router.route('/:abbr')
.get(nhlPlayoffTeamController.findByTeam)
.put(nhlPlayoffTeamController.findOneAndUpdate)


module.exports = router;