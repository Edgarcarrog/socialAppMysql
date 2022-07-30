const { Router } = require("express");

const {
  getUser,
  getAllUsers,
  createUser,
  auhtUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controller");

const router = Router();

router.get("/users/:userId", getUser);

router.get("/allusers/:userId", getAllUsers);

router.post("/users", createUser);

router.post("/users/auth", auhtUser);

router.put("/users/:userId", updateUser);

router.delete("/users/:userId", deleteUser);

module.exports = router;
