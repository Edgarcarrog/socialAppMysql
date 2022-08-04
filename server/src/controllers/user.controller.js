const userService = require("../services/userService");

exports.getUser = async (req, res) => {
  const data = await userService.getUser(req.params.userId);
  res.status(data.status).json({ message: data.msg, data: data.data });
};

exports.getAllUsers = async (req, res) => {
  const data = await userService.getAllUsers(req.params.userId);
  res.status(data.status).json({ message: data.msg, data: data.data });
};

exports.createUser = async (req, res) => {
  const data = await userService.createUser(req.body);
  res.status(data.status).json({ message: data.msg });
};

exports.verifyEmail = async (req, res) => {
  const data = await userService.verifyEmail(req.params.token);
  res.status(data.status).json({ message: data.msg });
};

exports.authUser = async (req, res) => {
  const data = await userService.authUser(req.body);
  res.status(data.status).json({ message: data.msg, data: data.data });
};

exports.updateUser = async (req, res) => {
  const result = await userService.updateUser(req.body, req.params.userId);
  res.json(result);
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);
  res.json(result);
};
