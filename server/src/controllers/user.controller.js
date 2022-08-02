const userService = require("../services/userService");

exports.getUser = async (req, res) => {
  const user = await userService.getUser(req.params.userId);
  res.json(user);
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await userService.getAllUsers(req.params.userId);
  res.json(allUsers);
};

exports.createUser = async (req, res) => {
  const data = await userService.createUser(req.body);
  res.status(data.status).json({ message: data.msg });
};

exports.verifyEmail = async (req, res) => {
  const result = await userService.verifyEmail(req.params.token);
  res.send("<h1>Correo verificado</h1>");
};

exports.auhtUser = async (req, res) => {
  const data = await userService.auhtUser(req.body);
  res.status(data.status).json({ data: data.result });
};

exports.updateUser = async (req, res) => {
  const result = await userService.updateUser(req.body, req.params.userId);
  res.json(result);
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);
  res.json(result);
};
