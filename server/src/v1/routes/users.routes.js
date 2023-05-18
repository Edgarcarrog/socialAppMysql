const { Router } = require("express");
const auth = require("../../middlewares/authUser");

const {
  authUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  verifyCookie,
  verifyEmail,
} = require("../../controllers/user.controller");

const router = Router();

router
  .get("/users/:userId", auth, getUser)

  .get("/allusers/:userId", auth, getAllUsers)

  .get("/users/confirm/:token", auth, verifyEmail)
  
  .get("/users/verify-cookie/:cookie", auth, verifyCookie)
  
  .post("/users", auth, createUser)

  .post("/users/auth", authUser)

  .put("/users/:userId", auth, updateUser)

  .delete("/users/:userId", auth, deleteUser);

module.exports = router;
