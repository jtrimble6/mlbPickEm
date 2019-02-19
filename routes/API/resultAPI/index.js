const router = require("express").Router();
const resultRoutes = require("./result");

router.use("/api/results", resultRoutes);

module.exports = router;
