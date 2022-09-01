const promisePool = require("../database/pool");

const createPost = (post) => {
  //console.log(post);

  const sql = "INSERT INTO posts (Id, description, user) VALUES (?,?,?)";

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

module.exports = {
  createPost,
};
