const router = require("express").Router();
const nhlPlayoffTeamRoutes = require("./nhlPlayoffTeam");

router.use("/api/nhlPlayoffTeams", nhlPlayoffTeamRoutes);

module.exports = router;
