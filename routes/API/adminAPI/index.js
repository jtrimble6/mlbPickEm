const router = require("express").Router();
const adminRoutes = require("./admin");

router.use("/api/admins", adminRoutes);

module.exports = router;
