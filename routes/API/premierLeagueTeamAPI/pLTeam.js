const router = require("express").Router();
const pLTeamController = require("../../../controllers/premierLeaguePickEm/pLTeamController");

router.route('/')
  .get(pLTeamController.findAll)
  .post(pLTeamController.create)
  

// router.route('/:id')
//   .get(pLTeamController.findById)
//   .put(pLTeamController.findOneAndUpdate)

router.route('/:abbr')
  .get(pLTeamController.findByTeam)
  .put(pLTeamController.findOneAndUpdate)


module.exports = router;