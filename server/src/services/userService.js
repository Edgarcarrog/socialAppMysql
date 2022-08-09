const promisePool = require("../database/pool");
const userPool = require("../helpers/userPool");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt");
const { getTemplate, sendEmail } = require("../config/mail");

//Obtiene el usuario con el id proporcionado
const getUser = (userId) => {
  return userPool
    .getUserById(userId)
    .then((response) => {
      const [[data]] = response;
      if (!data) throw new Error("Usuario no encontrado");
      return { status: 200, msg: "Usuario encontrado", data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

//Obtiene los usuarios a excepción del usuario loggeado
const getAllUsers = (userId) => {
  return userPool
    .getUsers(userId)
    .then((response) => {
      const [data] = response;
      if (!data) throw new Error("No hay más usuarios");
      return { status: 200, msg: "Resultado", data };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const createUser = (body) => {
  const { name, password, avatar, birthday, mail } = body;
  const token = getToken({ name, mail });
  const userId = uuidv4();
  const passwordHash = bcrypt.hashSync(password, 8);
  const template = getTemplate(name, token);
  const userData = [userId, name, passwordHash, avatar, birthday, mail];

  return userPool
    .getUserByEmail(mail)
    .then((response) => {
      const [[user]] = response;
      if (user) throw new Error("Ya existe una cuenta con este email");
      return userPool.createUser(userData);
    })
    .then(() => {
      sendEmail(mail, "Confirma tu correo", template).then(() => {
        console.log("Correo de verificación enviado");
      });
      return { status: 201, msg: "Cuenta creada" };
    })
    .catch((error) => {
      console.log(error);
      return { status: 400, msg: error.message };
    });
};

const verifyEmail = async (token) => {
  try {
    const result = getTokenData(token);

    //Revisa si el token ya expiró
    if (!result.data && result === "jwt expired") {
      console.log(result, "entró a if");
      return {
        status: 200,
        msg: "El periodo expiró. Envía un nuevo correo de verificación",
      };
    }

    const { mail } = result.data;

    //Revisa si el correo ha sido verificado anteriormente
    const [[user]] = await promisePool.query(
      "SELECT * FROM users WHERE mail = ?",
      [mail]
    );
    if (user.email_verified)
      return {
        status: 200,
        msg: "El correo ya ha sido verificado anteriormente",
      };

    let sql = "UPDATE users SET email_verified = 1 WHERE mail = ?";
    await promisePool.query(sql, [mail]);
    return { status: 200, msg: "Correo verificado" };
  } catch (error) {
    console.log(error, " chatín");
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
