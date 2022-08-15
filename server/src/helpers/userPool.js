const promisePool = require("../database/pool");

const createUser = (user) => {
  const sql =
    "INSERT INTO users (userId, name, password, avatar, birthday, mail) VALUES (?,?,?,?,?,?)";
  /*otra forma de hacer el query
     "INSERT INTO users SET name = ?, password = ?, avatar = ?, birthday = ?, mail = ?"*/
  return promisePool
    .query(sql, user)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getUserById = (id) => {
  const sql = `SELECT name, avatar, birthday FROM users WHERE userId = ?`;
  return promisePool
    .query(sql, [id])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getUserByEmail = (email) => {
  const sql = `SELECT * FROM users WHERE mail = ?`;
  return promisePool
    .query(sql, [email])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const getUsers = (id) => {
  const sql = "SELECT name, avatar, birthday FROM users WHERE userId != ?";
  return promisePool
    .query(sql, [id])
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const verifyEmail = (mail) => {
  const sql = "UPDATE users SET email_verified = 1 WHERE mail = ?";
  return promisePool
    .query(sql, [mail])
    .then(() => {})
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  verifyEmail,
};
