const { Router } = require("express");

const { createPost } = require("../../controllers/post.controller");

const router = Router();

router
  .post("/posts/:userId", createPost);

//   .delete("/posts/", deleteFollow);

module.exports = router;
