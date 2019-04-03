const router = require("express").Router();
const mastersRoutes = require("./golfer");

router.use("/api/masters", mastersRoutes);

module.exports = router;
