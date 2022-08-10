const userService = require("../services/userService");
const { serialize } = require("cookie");

exports.getUser = async (req, res) => {
  const result = await userService.getUser(req.params.userId);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers(req.params.userId);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.createUser = async (req, res) => {
  const data = await userService.createUser(req.body);
  res.status(data.status).json({ message: data.msg });
};

exports.verifyEmail = async (req, res) => {
  const result = await userService.verifyEmail(req.params.token);
  res.status(result.status).json({ message: result.msg });
};

exports.authUser = async (req, res) => {
  const result = await userService.authUser(req.body);
  console.log(result.data);
  const options = {
    httpOnly: true,
    secure: false,
    SameSite: "None",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: "/",
  };
  res.cookie("Cookie name", "encrypted cookie");
  return res
    .status(result.status)
    .cookie("MiPrimerCookie", "encrypted cookie", options)
    .json({ message: result.msg, data: result.data });
};

exports.updateUser = async (req, res) => {
  const result = await userService.updateUser(req.body, req.params.userId);
  res.json(result);
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);
  res.json(result);
};
