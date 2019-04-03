const router = require("express").Router();
const mastersController = require("../../../controllers/mastersController");

router.route('/')
  .get(mastersController.findAll)
  .post(mastersController.create)
  

// router.route('/:id')
//   .get(mastersController.findById)
//   .put(mastersController.findOneAndUpdate)

// router.route('/:id')
// .get(mastersController.findByTeam)
// .put(mastersController.findOneAndUpdate)


module.exports = router;