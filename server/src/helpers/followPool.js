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

const getFollowers = (follow) => {
  const sql =
    "SELECT u.userId, u.name, u.avatar, u.birthday, (SELECT f.Id FROM follows f WHERE f.followerId = u.userId and f.followingId = ?) as Id FROM users u WHERE userId in(SELECT followerId FROM follows WHERE followingId = ?)";
  /* "SELECT followingId FROM follows WHERE followerId = ?"; */

  return promisePool
    .query(sql, [follow, follow])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getFollowing = (follow) => {
  const sql =
    "SELECT u.userId, u.name, u.avatar, u.birthday, (SELECT f.Id FROM follows f WHERE f.followingId = u.userId and f.followerId = ?) as Id FROM users u WHERE userId in(SELECT followingId FROM follows WHERE followerId = ?)";
  /* "SELECT followingId FROM follows WHERE followerId = ?"; */

  return promisePool
    .query(sql, [follow, follow])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const deleteFollow = (follow) => {
  const sql = "DELETE FROM follows WHERE Id = ?";

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
  getFollowers,
  getFollowing,
  deleteFollow,
};
