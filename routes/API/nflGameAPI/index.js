const router = require("express").Router();
const nflGameRoutes = require("./nflGame");

router.use("/api/nflgames", nflGameRoutes);

module.exports = router;
