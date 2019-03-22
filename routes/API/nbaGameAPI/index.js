const router = require("express").Router();
const nbaGameRoutes = require("./nbaGame");

router.use("/api/nbagames", nbaGameRoutes);

module.exports = router;
