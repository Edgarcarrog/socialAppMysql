
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
  const userCreated = await userService.createUser(req.body);
  res.json(userCreated);
};

exports.updateUser = (req, res) => {
  res.send("Modificando usuario");
};

exports.deleteUser = (req, res) => {
  res.send("Borrando usuario");
};
