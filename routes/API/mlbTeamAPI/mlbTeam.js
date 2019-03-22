const router = require("express").Router();
const mlbTeamController = require("../../../controllers/mlbTeamController");

router.route('/')
  .get(mlbTeamController.findAll)
  .post(mlbTeamController.create)
  

// router.route('/:id')
//   .get(mlbTeamController.findById)
//   .put(mlbTeamController.findOneAndUpdate)

router.route('/:abbr')
.get(mlbTeamController.findByTeam)
.put(mlbTeamController.findOneAndUpdate)


module.exports = router;