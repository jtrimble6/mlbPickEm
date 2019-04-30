const router = require("express").Router();
const updatePasswordRoutes = require("./updatePassword");

router.use("/api/updatePassword", updatePasswordRoutes)
router.use("/api/updatePassword/:username", updatePasswordRoutes)

module.exports = router;