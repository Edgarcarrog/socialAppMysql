const { Router } = require("express");

const { createPost, getPosts } = require("../../controllers/post.controller");

const router = Router();

router
  .post("/posts/:userId", createPost)

  .get("/posts/:userId", getPosts);

//   .delete("/posts/", deleteFollow);

module.exports = router;
