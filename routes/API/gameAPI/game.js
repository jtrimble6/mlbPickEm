const router = require("express").Router();
const gameController = require("../../../controllers/gameController");

router.route("/")
  .post(gameController.create)
  .get(gameController.findAll)

//router.route("/action")
//  .post(userController.create)

// router.post(
  
// )

// router.get('/', (req, res, next) => {
//   console.log('===== user!!======')
//   console.log(req.user)
//   if (req.user) {
//       res.json({ user: req.user })
//   } else {
//       res.json({ user: null })
//   }
// })

router.route("/:id")
  .get(gameController.findById)
  .put(gameController.findOneAndUpdate)
  
//   .delete(userController.remove)

module.exports = router;