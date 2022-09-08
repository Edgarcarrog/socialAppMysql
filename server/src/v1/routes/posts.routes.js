const { Router } = require("express");

const {
  createPost,
  getMyPosts,
  getPosts,
} = require("../../controllers/post.controller");

const router = Router();

router
  .post("/posts/:userId", createPost)

  .get("/myposts/:userId", getMyPosts)

  .get("/posts/:userId", getPosts);

//   .delete("/posts/", deleteFollow);

module.exports = router;
