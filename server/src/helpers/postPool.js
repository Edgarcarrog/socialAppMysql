const promisePool = require("../database/pool");

const createPost = (post) => {
  const sql =
    "INSERT INTO posts SET Id = ?, description = ?, user = ?, date = NOW() ";

  return promisePool
    .query(sql, post)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getPosts = (followerId) => {
  console.log(followerId);
  const sql =
    "SELECT Id, description, date FROM posts WHERE user in(SELECT followingId  FROM follows WHERE followerId = ?) ORDER BY date DESC LIMIT 10";
  /* "SELECT followingId FROM follows WHERE followerId = ?"; */

  return promisePool
    .query(sql, [followerId])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createPost,
  getPosts,
};
