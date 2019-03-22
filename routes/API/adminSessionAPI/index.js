const router = require("express").Router();
const adminSessionRoutes = require("./adminSession");

router.use("/api/adminSessions", adminSessionRoutes);

module.exports = router;
