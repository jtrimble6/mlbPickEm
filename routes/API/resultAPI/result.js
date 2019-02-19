const router = require("express").Router();
const resultController = require("../../../controllers/resultController");

router.route('/')
  .post(resultController.create)
  .get(resultController.findAll)
  

// router.route('/:username')
//   .get(resultController.findByUser)
//   .put(resultController.findOneAndUpdate)

// router.route('/:team')
//   .get(resultController.findbyTeam)

// router.route('/:team/:id')
//   .get(resultController.findById)
//   .put(resultController.findOneAndUpdate)

module.exports = router;