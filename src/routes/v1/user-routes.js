const express = require("express");
const { UserController } = require("../../controllers");
const { AuthRequestMiddlewares } = require("../../middlewares");
const router = express.Router();

/**
 * /api/v1/user/ POST
 */
router.post(
  "/singup",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signup
);
router.post(
  "/signin",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signin
);

module.exports = router;
