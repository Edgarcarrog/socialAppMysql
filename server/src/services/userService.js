const promisePool = require("../database/pool");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt");
const { getTemplate, sendEmail } = require("../config/mail");

const getUser = async (userId) => {
  const sql = "SELECT name FROM users WHERE userId = ?";
  // Otra forma de hacerlo
  // `SELECT * FROM users WHERE userId != ${userId}`

  const [[rows]] = await promisePool.query(sql, [userId]);
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
  console.time("Tiempo");
  const { name, password, avatar, birthday, mail } = body;

  const [[[user]], passwordHash] = await Promise.all([
    promisePool.query("SELECT * FROM users WHERE mail = ?", [mail]),
    bcrypt.hash(password, 8),
  ]);

  if (user) return { status: 400, msg: "Ya existe una cuenta con este email" };

  const token = getToken({ name, mail });
  const template = getTemplate(name, token);
  const userId = uuidv4();
  const data = [userId, name, passwordHash, avatar, birthday, mail];
  const sql =
    "INSERT INTO users (userId, name, password, avatar, birthday, mail) VALUES (?,?,?,?,?,?)";
  //otra forma de hacer el query
  /* "INSERT INTO users SET name = ?, password = ?, avatar = ?, birthday = ?, mail = ?",*/

  sendEmail(mail, "Confirma tu correo", template);
  /* .then(() => {
      console.log("Correo enviado");
    })
    .catch((err) => {
      console.log(err);
    }); */

  promisePool.query(sql, data);
  /* .then(() => {
      console.log("Cuenta creada");
    })
    .catch((err) => {
      console.log(err);
    }); */

  console.timeEnd("Tiempo");
  return { status: 200, msg: "Cuenta creada con éxito" };
  /* await Promise.all([
    sendEmail(mail, "Confirma tu correo", template),
    promisePool.query(sql, data),
  ]);
  console.timeEnd("Crear usuario");
  return { status: 200, msg: "Cuenta creada con éxito" }; */
};

const verifyEmail = async (token) => {
  const result = getTokenData(token);
  const { mail } = result.data;
  const sql = "UPDATE users SET email_verified = 1 WHERE mail = ?";

  await promisePool.query(sql, [mail]);
  return { status: 200, msg: "Correo verificado" };
};

const auhtUser = async (body) => {
  const { mail, password } = body;

  if (mail && password) {
    const sql = "SELECT * FROM users WHERE mail = ?";
    const [[data]] = await promisePool.query(sql, [mail]);

    const correctPass =
      data === undefined
        ? false
        : await bcrypt.compare(password, data.password);

    if (!correctPass) {
      return { status: 400, result: { msg: "Usuario o password incorrecto" } };
    }
    return { status: 200, result: { msg: "Bienvenido", data } };
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
  verifyEmail,
  auhtUser,
  updateUser,
  deleteUser,
};
