const router = require("express").Router();
const nflGameController = require("../../../controllers/nflGameController");

router.route('/')
  .get(nflGameController.findAll)
  .post(nflGameController.create)
  

// router.route('/:id')
//   .get(nflGameController.findById)
//   .put(nflGameController.findOneAndUpdate)

router.route('/:date')
  .get(nflGameController.findByDate)

// router.route('/:team')
//   .get(nflGameController.findbyTeam)

router.route('/:date/:id')
  .get(nflGameController.findById)
  .put(nflGameController.findOneAndUpdate)

module.exports = router;