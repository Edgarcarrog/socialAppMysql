const { Router } = require("express");

const {
  getUser,
  getAllUsers,
  createtUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/user/:userId", getUser);

router.get("/allusers/:userId", getAllUsers);

router.post("/user", createtUser);

router.put("/user/:userId", updateUser);

router.delete("/user/:userId", deleteUser);

module.exports = router;
