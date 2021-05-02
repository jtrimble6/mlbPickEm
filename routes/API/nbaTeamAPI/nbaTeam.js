const router = require("express").Router();
const nbaTeamController = require("../../../controllers/nbaPickEm/nbaTeamController");

router.route('/')
  .get(nbaTeamController.findAll)
  .post(nbaTeamController.create)
  

// router.route('/:id')
//   .get(nbaTeamController.findById)
//   .put(nbaTeamController.findOneAndUpdate)

router.route('/:abbr')
  .get(nbaTeamController.findByTeam)
  .put(nbaTeamController.findOneAndUpdate)
  .delete(nbaTeamController.findOneAndEmpty)


module.exports = router;