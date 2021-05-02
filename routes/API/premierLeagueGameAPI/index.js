const router = require("express").Router();
const pLGameRoutes = require("./pLGame");

router.use("/api/plgames", pLGameRoutes);

module.exports = router;
