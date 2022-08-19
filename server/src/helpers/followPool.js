const promisePool = require("../database/pool");

const createFollow = (follow) => {
  const sql =
    "INSERT INTO follows (Id, followerId, followingId) VALUES (?,?,?)";

  return promisePool
    .query(sql, follow)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getFollowing = (follow) => {
  const sql =
    "SELECT userId, name, avatar, birthday FROM users WHERE userId in(SELECT followingId FROM follows WHERE followerId = ?)";
  /* "SELECT followingId FROM follows WHERE followerId = ?"; */

  return promisePool
    .query(sql, [follow])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createFollow,
  getFollowing,
};
