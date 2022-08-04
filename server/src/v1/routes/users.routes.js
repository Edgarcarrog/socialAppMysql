const { Router } = require("express");

const {
  getUser,
  getAllUsers,
  createUser,
  verifyEmail,
  authUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controller");

const router = Router();

router.get("/users/:userId", getUser);

router.get("/allusers/:userId", getAllUsers);

router.post("/users", createUser);

router.get("/users/confirm/:token", verifyEmail);

router.post("/users/auth", authUser);

router.put("/users/:userId", updateUser);

router.delete("/users/:userId", deleteUser);

module.exports = router;
