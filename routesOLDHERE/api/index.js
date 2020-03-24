const router = require("express").Router();
const authRoutes = require("./auth-routes");

// Book routes
router.use("/auth-routes", authRoutes);

module.exports = router;
