const router = require("express").Router();
const nbaGameController = require("../../../controllers/nbaGameController");

router.route('/')
  .get(nbaGameController.findAll)
  .post(nbaGameController.create)
  

// router.route('/:id')
//   .get(nbaGameController.findById)
//   .put(nbaGameController.findOneAndUpdate)

router.route('/:date')
  .get(nbaGameController.findByDate)

// router.route('/:team')
//   .get(nbaGameController.findbyTeam)

router.route('/:date/:id')
  .get(nbaGameController.findById)
  .put(nbaGameController.findOneAndUpdate)

module.exports = router;