const router = require("express").Router();
const gameController = require("../../../controllers/gameController");

router.route('/')
  .post(gameController.create)
  .get(gameController.findAll)

// router.route('/:id')
//   .get(gameController.findById)
//   .put(gameController.findOneAndUpdate)

router.route('/:date')
  .get(gameController.findByDate)

// router.route('/:team')
//   .get(gameController.findbyTeam)

router.route('/:date/:id')
  .get(gameController.findById)
  .put(gameController.findOneAndUpdate)

module.exports = router;