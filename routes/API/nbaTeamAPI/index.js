const router = require("express").Router();
const nbaTeamRoutes = require("./nbaTeam");

router.use("/api/nbateams", nbaTeamRoutes);

module.exports = router;
