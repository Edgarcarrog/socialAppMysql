const userService = require("../services/userService");

exports.authUser = async (req, res) => {
  const result = await userService.authUser(req.body);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.createUser = async (req, res) => {
  const data = await userService.createUser(req.body);
  res.status(data.status).json({ message: data.msg });
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);
  res.json(result);
};

exports.getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers(req.params.userId);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.getUser = async (req, res) => {
  const result = await userService.getUser(req.params.token);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.updateUser = async (req, res) => {
  const result = await userService.updateUser(req.body, req.params.userId);
  res.json(result);
};

exports.verifyUser = async (req, res) => {
  /* res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  ); */
  const result = await userService.verifyUser(req.params.user);
  res.status(result.status).json({ message: result.msg, data: result.data });
};

exports.verifyEmail = async (req, res) => {
  const result = await userService.verifyEmail(req.params.token);
  res.status(result.status).json({ message: result.msg });
};
