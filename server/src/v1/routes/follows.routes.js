const { Router } = require("express");

const {
  createFollow,
  getFollowing,
} = require("../../controllers/follow.controller");

const router = Router();

router
  .get("/follows", createFollow)

  .get("/following/:user", getFollowing)

  .get("/followers/:user", (req, res) => {
    console.log(req.params);
  });

module.exports = router;
