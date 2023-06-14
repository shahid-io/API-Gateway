const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();

/**
 * /api/v1/user/ POST
 */
router.post("/", UserController.createUser);

module.exports = router;
