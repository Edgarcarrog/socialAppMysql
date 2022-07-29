const promisePool = require("../db/pool");

exports.getUser = (req, res) => {
  res.send("Obteniendo usuario");
};

exports.getAllUsers = async (req, res) => {
  const { userId } = req.params;
  const [rows] = await promisePool.query(
    "SELECT * FROM users WHERE userId != ?",
    [userId]
    // Otra forma de hacerlo
    // `SELECT * FROM users WHERE userId != ${userId}`
  );
  res.json(rows);
};

exports.createtUser = async (req, res) => {
  const { name, avatar, birthday, mail } = req.body;
  const [result] = await promisePool.query(
    "INSERT INTO users (name, avatar, birthday, mail) VALUES (?,?,?,?)",
    //otra forma de hacer el query
    // "INSERT INTO users SET name = ?, avatar = ?, birthday = ?, mail = ?",
    [name, avatar, birthday, mail]
  );
  res.json({
    userId: result.insertId,
    name,
    avatar,
    birthday,
    mail,
  });
};

exports.updateUser = (req, res) => {
  res.send("Modificando usuario");
};

exports.deleteUser = (req, res) => {
  res.send("Borrando usuario");
};
