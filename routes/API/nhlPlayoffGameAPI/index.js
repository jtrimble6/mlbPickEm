const router = require("express").Router();
const NhlPlayoffGameRoutes = require("./nhlPlayoffGame");

router.use("/api/nhlplayoffgames", NhlPlayoffGameRoutes);

module.exports = router;
