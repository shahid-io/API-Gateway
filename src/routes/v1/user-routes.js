const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();

/**
 * /api/v1/user/ POST
 */
router.post("/singup", UserController.signup);
router.post("/signin", UserController.signin);

module.exports = router;
