const { Router } = require("express");
const auth = require("../../middlewares/authUser");

const {
  createFollow,
  getFollowers,
  getFollowing,
  deleteFollow,
} = require("../../controllers/follow.controller");

const router = Router();

router
  .get("/follows", auth, createFollow)

  .get("/following/:user", auth, getFollowing)

  .get("/followers/:user", getFollowers)

  .delete("/follows/", deleteFollow);

module.exports = router;
