const router = require("express").Router();
const challengeRoutes = require("./challenge");

router.use("/api/challenges", challengeRoutes);
router.use('/api/challenges/:id', challengeRoutes)
router.use('/api/challenges/:id/users/:user', challengeRoutes)
router.use('/api/challenges/:id/users/:user/:date', challengeRoutes)

module.exports = router;
