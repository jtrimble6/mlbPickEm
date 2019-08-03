const router = require("express").Router();
const nflTeamRoutes = require("./nflTeam");

router.use("/api/nflteams", nflTeamRoutes);

module.exports = router;
