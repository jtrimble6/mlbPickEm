const router = require("express").Router();
const userRoutes = require("./user");

router.use("/api/users", userRoutes);
router.use("/api/users/login", userRoutes)
router.use("/user", userRoutes)
router.use("/logout", userRoutes)

module.exports = router;