const router = require("express").Router();
const userRoutes = require("./users");
const authRoutes = require("./auth");

// User routes
router.use("/api/user", userRoutes);
router.use("/auth", userRoutes);
module.exports = router;
