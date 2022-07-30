const promisePool = require("../database/pool");
const bcrypt = require("bcryptjs");

const getUser = async (userId) => {
  const [[rows]] = await promisePool.query(
    "SELECT * FROM users WHERE userId = ?",
    [userId]
    // Otra forma de hacerlo
    // `SELECT * FROM users WHERE userId != ${userId}`
  );
  return rows;
};

const getAllUsers = async (userId) => {
  const [rows] = await promisePool.query(
    "SELECT * FROM users WHERE userId != ?",
    [userId]
    // Otra forma de hacerlo
    // `SELECT * FROM users WHERE userId != ${userId}`
  );
  return rows;
};

const createUser = async (body) => {
  const { name, password, avatar, birthday, mail } = body;
  const passwordHash = await bcrypt.hash(password, 8);
  const [result] = await promisePool.query(
    "INSERT INTO users (name, password, avatar, birthday, mail) VALUES (?,?,?,?,?)",
    //otra forma de hacer el query
    /* "INSERT INTO users SET name = ?, password = ?, avatar = ?, birthday = ?, mail = ?",*/
    [name, passwordHash, avatar, birthday, mail]
  );
  return {
    userId: result.insertId,
    name,
    avatar,
    birthday,
    mail,
  };
};

const updateUser = async (body, userId) => {
  const { name, avatar, birthday, mail } = body;
  const [result] = await promisePool.query(
    "UPDATE users SET name = ?, avatar = ?, birthday = ?, mail = ? WHERE userId = ?",
    [name, avatar, birthday, mail, userId]
  );
  return {
    result,
  };
};

const deleteUser = async (userId) => {
  const [result] = await promisePool.query(
    "DELETE FROM users WHERE userId = ?",
    [userId]
  );
  return result;
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
