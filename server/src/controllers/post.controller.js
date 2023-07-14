const postService = require("../services/postService");

exports.createPost = async (req, res) => {
  const result = await postService.createPost(req.body, req.params.userId);
  return res.status(result.status).json({ message: result.msg });
};

exports.getMyPosts = async (req, res) => {
  console.log("getMyPosts Controller token: ", req.params.token);
  const result = await postService.getMyPosts(req.params.token);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.getFollowingPosts = async (req, res) => {
  const result = await postService.getFollowingPosts(req.params.userId);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.getOtherPosts = async (req, res) => {
  const result = await postService.getOtherPosts(req.params.token);
  console.log("req.params.token" + req.params.token);
  return res
    .status(result.status)
    .json({ message: result.msg, data: result.data });
};

exports.deletePost = async (req, res) => {
  const result = await postService.deletePost(req.params.postId);
  return res.status(result.status).json({ message: result.msg });
};

exports.updatePost = async (req, res) => {
  const result = await postService.updatePost(req.body, req.params.postId);
  return res.status(result.status).json({ message: result.msg });
};
