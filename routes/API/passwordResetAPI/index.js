const router = require("express").Router();
const passwordResetRoutes = require("./passwordReset");

router.use("/api/passwordReset", passwordResetRoutes)
router.use("/api/passwordReset/:username", passwordResetRoutes)
router.use("/api/passwordReset/:username/:token", passwordResetRoutes)
// router.use("/api/users/login", passwordResetRoutes)
// router.use("/user", passwordResetRoutes)

module.exports = router;