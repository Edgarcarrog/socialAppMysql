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

module.exports = {
  createFollow,
};
