const router = require("express").Router();
const messageBoardRoutes = require("./messageBoard");

router.use("/api/messageBoard", messageBoardRoutes)
router.use("/api/messageBoard/:user", messageBoardRoutes)
// router.use("/messageBoard", messageBoardRoutes)


module.exports = router;