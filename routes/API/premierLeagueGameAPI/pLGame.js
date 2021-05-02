const router = require("express").Router();
const pLGameController = require("../../../controllers/premierLeaguePickEm/pLGameController");

router.route('/')
  .get(pLGameController.findAll)
  .post(pLGameController.create)
  

// router.route('/:id')
//   .get(pLGameController.findById)
//   .put(pLGameController.findOneAndUpdate)

router.route('/:date')
  .get(pLGameController.findByDate)

// router.route('/:team')
//   .get(pLGameController.findbyTeam)

router.route('/:date/:id')
  .get(pLGameController.findById)
  .put(pLGameController.findOneAndUpdate)

module.exports = router;