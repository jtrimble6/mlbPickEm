const router = require("express").Router();
const gameRoutes = require("./game");

router.use("/api/games", gameRoutes);

module.exports = router;
