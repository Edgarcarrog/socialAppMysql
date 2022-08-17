const followService = require("../services/followService");

exports.getFollows = async (req, res) => {
  const result = await followService.createFollow(req.query);
  return res
    .status(result.status)
    .json({ message: result.msg });
};
