const postService = require("../services/postService");

exports.createPost = async (req, res) => {
  const result = await postService.createPost(req.body, req.params.userId);
  return res.status(result.status).json({ message: result.msg });
};
