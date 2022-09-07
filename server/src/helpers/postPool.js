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
    "SELECT p.Id, p.user, p.description, p.date, DATE_FORMAT(date, '%a %e %b %Y') AS date_public, (SELECT u.name FROM users u where u.userId = p.user) as name FROM posts p WHERE user in(SELECT followingId FROM follows WHERE followerId = ?) ORDER BY date DESC LIMIT 10";

  return promisePool
    .query("SET @@lc_time_names = 'es_ES'")
    .then(() => {
      return promisePool.query(sql, [followerId]);
    })
    .then((response) => {
      console.log(response[0]);
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
