const router = require("express").Router();
const nbaPlayoffTeamRoutes = require("./nbaPlayoffTeam");

router.use("/api/nbaPlayoffTeams", nbaPlayoffTeamRoutes);

module.exports = router;
