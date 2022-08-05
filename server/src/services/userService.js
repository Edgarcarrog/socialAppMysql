const promisePool = require("../database/pool");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt");
const { getTemplate, sendEmail } = require("../config/mail");

//Obtiene el usuario con el id proporcionado
const getUser = async (userId) => {
  const sql = "SELECT name FROM users WHERE userId = ?";
  // Otra forma de hacerlo
  // `SELECT * FROM users WHERE userId != ${userId}`

  try {
    const [[data]] = await promisePool.query(sql, [userId]);
    if (!data) return { status: 404, msg: "Usuario no existe" };
    return { status: 200, msg: "Usuario encontrado", data };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

//Obtiene los usuarios a excepción del usuario loggeado
const getAllUsers = async (userId) => {
  const sql = "SELECT name, avatar, birthday FROM users WHERE userId != ?";
  // Otra forma de hacerlo
  // `SELECT name, avatar, birthday FROM users WHERE userId != ${userId}`

  try {
    const [data] = await promisePool.query(sql, [userId]);
    return { status: 200, msg: "Usuarios encontrados", data };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

const createUser = async (body) => {
  const { name, password, avatar, birthday, mail } = body;
  const token = getToken({ name, mail });
  const template = getTemplate(name, token);
  const userId = uuidv4();
  const passwordHash = bcrypt.hashSync(password, 8);
  const data = [userId, name, passwordHash, avatar, birthday, mail];
  const sql =
    "INSERT INTO users (userId, name, password, avatar, birthday, mail) VALUES (?,?,?,?,?,?)";
  /*otra forma de hacer el query
     "INSERT INTO users SET name = ?, password = ?, avatar = ?, birthday = ?, mail = ?"*/

  try {
    const [[user]] = await promisePool.query(
      "SELECT * FROM users WHERE mail = ?",
      [mail]
    );
    if (user)
      return { status: 400, msg: "Ya existe una cuenta con este email" };

    sendEmail(mail, "Confirma tu correo", template)
      .then(() => {
        console.log("Correo de verificación enviado");
      })
      .catch((error) => {
        console.log(error.message);
        return { status: 400, msg: error.message };
      });

    return promisePool
      .query(sql, data)
      .then(() => {
        return { status: 201, msg: "Cuenta creada" };
      })
      .catch((error) => {
        console.log(error.message);
        return { status: 400, msg: error.message };
      });
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

const verifyEmail = async (token) => {
  const result = getTokenData(token);
  const { mail } = result.data;
  const sql = "UPDATE users SET email_verified = 1 WHERE mail = ?";

  try {
    await promisePool.query(sql, [mail]);
    return { status: 200, msg: "Correo verificado" };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

const authUser = async (body) => {
  const { mail, password } = body;

  if (mail && password) {
    try {
      const sql = "SELECT * FROM users WHERE mail = ?";
      const [[data]] = await promisePool.query(sql, [mail]);

      if (!!data && data.email_verified === 0)
        return {
          status: 400,
          msg: "El correo no ha sido verificado",
        };

      const correctPass =
        data === undefined
          ? false
          : await bcrypt.compare(password, data.password);

      if (!correctPass) {
        return {
          status: 400,
          msg: "Usuario o password incorrecto",
        };
      }

      return { status: 200, msg: "Bienvenido", data };
    } catch (error) {
      console.log(error.message);
      return { status: 400, msg: error.message };
    }
  }
};

const updateUser = async (body, userId) => {
  const { name, avatar, birthday } = body;
  const sql =
    "UPDATE users SET name = ?, avatar = ?, birthday = ? WHERE userId = ?";
  const data = [name, avatar, birthday, userId];

  try {
    const [result] = await promisePool.query(sql, data);
    return { status: 200, msg: "Datos actualizados", result };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

const deleteUser = async (userId) => {
  try {
    const [result] = await promisePool.query(
      "DELETE FROM users WHERE userId = ?",
      [userId]
    );
    return { status: 200, msg: "Usuario eliminado", result };
  } catch (error) {
    console.log(error.message);
    return { status: 400, msg: error.message };
  }
};

module.exports = {
  getUser,
  getAllUsers,
  createUser,
  verifyEmail,
  authUser,
  updateUser,
  deleteUser,
};
