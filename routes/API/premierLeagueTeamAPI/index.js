const router = require("express").Router();
const pLTeamRoutes = require("./pLTeam");

router.use("/api/plteams", pLTeamRoutes);

module.exports = router;
