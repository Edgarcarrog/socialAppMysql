const promisePool = require("../database/pool");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const getUser = async (userId) => {
  const sql = "SELECT name FROM users WHERE userId = ?";

  const [[rows]] = await promisePool.query(
    sql,
    [userId]
    // Otra forma de hacerlo
    // `SELECT * FROM users WHERE userId != ${userId}`
  );
  return rows;
};

const getAllUsers = async (userId) => {
  const sql = "SELECT name, avatar, birthday FROM users WHERE userId != ?";

  const [rows] = await promisePool.query(
    sql,
    [userId]
    // Otra forma de hacerlo
    // `SELECT name, avatar, birthday FROM users WHERE userId != ${userId}`
  );
  return rows;
};

const createUser = async (body) => {
  const { name, password, avatar, birthday, mail } = body;
  const passwordHash = await bcrypt.hash(password, 8);
  const userId = uuidv4();
  const sql =
    "INSERT INTO users (userId, name, password, avatar, birthday, mail) VALUES (?,?,?,?,?,?)";
  const data = [userId, name, passwordHash, avatar, birthday, mail];

  const [result] = await promisePool.query(
    sql,
    data
    //otra forma de hacer el query
    /* "INSERT INTO users SET name = ?, password = ?, avatar = ?, birthday = ?, mail = ?",*/
  );
  return {
    result,
  };
};

const auhtUser = async (body) => {
  const { mail, password } = body;

  if (mail && password) {
    const sql = "SELECT password FROM users WHERE mail = ?";
    const [[pass]] = await promisePool.query(sql, [mail]);

    const correctPass =
      pass === undefined
        ? false
        : await bcrypt.compare(password, pass.password);

    if (!correctPass) {
      return { msg: "Usuario o password incorrecto" };
    }
    return { msg: "te has logeado" };
  }

  const sql =
    "INSERT INTO users (userId, name, password, avatar, birthday, mail) VALUES (?,?,?,?,?,?)";
  const data = [passwordHash, birthday, mail];

  const [result] = await promisePool.query(
    sql,
    data
    //otra forma de hacer el query
    /* "INSERT INTO users SET name = ?, password = ?, avatar = ?, birthday = ?, mail = ?",*/
  );
  return {
    result,
  };
};

const updateUser = async (body, userId) => {
  const { name, avatar, birthday, mail } = body;
  const sql =
    "UPDATE users SET name = ?, avatar = ?, birthday = ?, mail = ? WHERE userId = ?";
  const data = [name, avatar, birthday, mail, userId];

  const [result] = await promisePool.query(sql, data);
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
  auhtUser,
  updateUser,
  deleteUser,
};
