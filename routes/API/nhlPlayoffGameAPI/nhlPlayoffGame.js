const router = require("express").Router();
const nhlPlayoffGameController = require("../../../controllers/nhlPlayoffPickEm/nhlPlayoffGameController");

router.route('/')
  .get(nhlPlayoffGameController.findAll)
  .post(nhlPlayoffGameController.create)
  

// router.route('/:id')
//   .get(nhlPlayoffGameController.findById)
//   .put(nhlPlayoffGameController.findOneAndUpdate)

router.route('/:date')
  .get(nhlPlayoffGameController.findByDate)

// router.route('/:team')
//   .get(nhlPlayoffGameController.findbyTeam)

router.route('/:date/:id')
  .get(nhlPlayoffGameController.findById)
  .put(nhlPlayoffGameController.findOneAndUpdate)

module.exports = router;