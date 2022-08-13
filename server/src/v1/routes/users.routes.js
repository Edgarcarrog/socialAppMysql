const { Router } = require("express");

const {
  getUser,
  getAllUsers,
  createUser,
  verifyCookie,
  verifyEmail,
  authUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user.controller");

const router = Router();

router.get("/users/:userId", getUser);

//TODO: implement
router.get("/users/get/profile/:user", (req, res) => {
  res.json(req.params.user);
});

router.get("/allusers/:userId", getAllUsers);

router.post("/users", createUser);

router.get("/users/confirm/:token", verifyEmail);

router.get("/users/verify-cookie/:cookie", verifyCookie);

router.post("/users/auth", authUser);

router.put("/users/:userId", updateUser);

router.delete("/users/:userId", deleteUser);

module.exports = router;
