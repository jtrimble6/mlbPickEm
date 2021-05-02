const router = require("express").Router();
const pLTeamRoutes = require("./plTeam");

router.use("/api/plteams", pLTeamRoutes);

module.exports = router;
