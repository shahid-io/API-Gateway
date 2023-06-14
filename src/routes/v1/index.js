const express = require("express");

const { InfoController } = require("../../controllers");
const { AuthRequestMiddlewares } = require("../../middlewares");
const userRoutes = require("./user-routes");

const router = express.Router();

router.get("/info",AuthRequestMiddlewares.checkAuth, InfoController.info);

router.use("/user", userRoutes);

module.exports = router;
