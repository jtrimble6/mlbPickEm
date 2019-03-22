const router = require("express").Router();
const mlbGameController = require("../../../controllers/mlbGameController");

router.route('/')
  .get(mlbGameController.findAll)
  .post(mlbGameController.create)
  

// router.route('/:id')
//   .get(mlbGameController.findById)
//   .put(mlbGameController.findOneAndUpdate)

router.route('/:date')
  .get(mlbGameController.findByDate)

// router.route('/:team')
//   .get(mlbGameController.findbyTeam)

router.route('/:date/:id')
  .get(mlbGameController.findById)
  .put(mlbGameController.findOneAndUpdate)

module.exports = router;