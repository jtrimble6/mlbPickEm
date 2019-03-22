const router = require("express").Router();
const teamRoutes = require("./team");

router.use("/api/teams", teamRoutes);

module.exports = router;
