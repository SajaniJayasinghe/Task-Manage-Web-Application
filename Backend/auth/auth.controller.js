const { StatusCodes } = require("http-status-codes");
const authService = require("./auth.service");
const authUtil = require("./auth.utill");

const BadRequestError = require("../error/error.classes/BadRequestError");
const UnauthorizedError = require("../error/error.classes/UnauthorizedError");
const NotFoundError = require("../error/error.classes/NotFoundError");

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  //validate email and password
  if (!email || !password) {
    throw new BadRequestError("Email and password are required!");
  }

  // Check if user exists
  const user = await authService.findById(email);
  if (!user) {
    throw new NotFoundError("Invalid Email!");
  }
  // Check if password is correct
  const isPasswordCorrect = await authUtil.comparePassword(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Password");
  }
  //Generate Token
  const token = authUtil.signToken(user);
  // Respond with token and role
  return res
    .status(StatusCodes.OK)
    .setHeader("authorization", `Bearer ${token}`)
    .json({
      message: "Login Successful",
      token: token,
    });
};

module.exports = {
  LoginUser,
};
