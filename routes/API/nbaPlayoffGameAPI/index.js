const router = require("express").Router();
const NbaPlayoffGameRoutes = require("./nbaPlayoffGame");

router.use("/api/nbaplayoffgames", NbaPlayoffGameRoutes);

module.exports = router;
