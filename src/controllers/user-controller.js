const { StatusCodes } = require("http-status-codes");
const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 * POST: /signup
 * req-body: {email: "zyx@gmail.com", password:"xxxxxx"}
 */

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.singup({ email, password });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.signin({ email, password });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { signup, signin };
