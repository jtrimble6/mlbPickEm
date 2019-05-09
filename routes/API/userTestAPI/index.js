const router = require("express").Router();
const userTestRoutes = require("./user");

router.use("/api/test", userTestRoutes)
router.use("/api/test/:id", userTestRoutes)

module.exports = router;