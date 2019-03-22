const router = require("express").Router();
const mlbGameRoutes = require("./mlbGame");

router.use("/api/mlbgames", mlbGameRoutes);

module.exports = router;
