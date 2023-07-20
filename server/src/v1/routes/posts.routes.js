const { Router } = require("express");
const auth = require("../../middlewares/authUser");

const {
  addLike,
  subslike,
  createPost,
  get_like,
  getFollowingPosts,
  getMyPosts,
  getOtherPosts,
  deletePost,
  updatePost,
} = require("../../controllers/post.controller");

const router = Router();

router
  .post("/addlike", auth, addLike)

  .post("/subslike", auth, subslike)
  
  .post("/posts/:userId", auth, createPost)
  
  .post("/get-like", auth, get_like)

  .get("/myposts/:token", auth, getMyPosts)

  .get("/posts/:userId", getFollowingPosts)

  .get("/otherposts/:token", auth, getOtherPosts)

  .put("/posts/:postId", updatePost)

  .delete("/posts/:postId", deletePost);

module.exports = router;
