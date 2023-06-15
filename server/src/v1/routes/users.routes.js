const { Router } = require("express");
const auth = require("../../middlewares/authUser");

const {
  authUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  verifyUser,
  verifyEmail,
} = require("../../controllers/user.controller");

const router = Router();

router
  .get("/users/:userId", auth, getUser)

  .get("/allusers/:userId", auth, getAllUsers)

  .get("/users/confirm/:token", auth, verifyEmail)
  
  .get("/users/verify-user/:user", verifyUser)
  
  .post("/users", auth, createUser)

  .post("/users/auth", authUser)

  .put("/users/:userId", auth, updateUser)

  .delete("/users/:userId", auth, deleteUser);

module.exports = router;
