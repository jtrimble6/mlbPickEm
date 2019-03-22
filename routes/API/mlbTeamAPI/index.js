const router = require("express").Router();
const mlbTeamRoutes = require("./mlbTeam");

router.use("/api/mlbteams", mlbTeamRoutes);

module.exports = router;
