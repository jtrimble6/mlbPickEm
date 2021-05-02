const router = require("express").Router();
const nbaPlayoffGameController = require("../../../controllers/nbaPlayoffPickEm/nbaPlayoffGameController");

router.route('/')
  .get(nbaPlayoffGameController.findAll)
  .post(nbaPlayoffGameController.create)
  

// router.route('/:id')
//   .get(nbaPlayoffGameController.findById)
//   .put(nbaPlayoffGameController.findOneAndUpdate)

router.route('/:date')
  .get(nbaPlayoffGameController.findByDate)

// router.route('/:team')
//   .get(nbaPlayoffGameController.findbyTeam)

router.route('/:date/:id')
  .get(nbaPlayoffGameController.findById)
  .put(nbaPlayoffGameController.findOneAndUpdate)

module.exports = router;