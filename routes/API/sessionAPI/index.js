const router = require("express").Router();
const sessionRoutes = require("./session");

router.use("/api/sessions", sessionRoutes);

module.exports = router;
