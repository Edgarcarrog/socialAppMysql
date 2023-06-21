const { Router } = require("express");
const auth = require("../../middlewares/authUser");

const {
  createPost,
  getFollowingPosts,
  getMyPosts,
  getOtherPosts,
  deletePost,
  updatePost,
} = require("../../controllers/post.controller");

const router = Router();

router
  .post("/posts/:userId", auth, createPost)

  .get("/myposts/:userId", auth, getMyPosts)

  .get("/posts/:userId", getFollowingPosts)

  .get("/otherposts/:token", auth, getOtherPosts)

  .put("/posts/:postId", updatePost)

  .delete("/posts/:postId", deletePost);

module.exports = router;
