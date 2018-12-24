const router = require("express").Router();
const gameRoutes = require("./game");

router.use("/api/games", sessionRoutes);

module.exports = router;
