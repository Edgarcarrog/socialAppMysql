const promisePool = require("../database/pool");
const userPool = require("../helpers/userPool");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { getToken, getTokenData } = require("../config/jwt");
const { getTemplate, sendEmail } = require("../config/mail");

const createUser = (body) => {
  const { name, password, avatar, birthday, mail } = body;
  const userId = uuidv4();
  const passwordHash = bcrypt.hashSync(password, 8);
  const userData = [userId, name, passwordHash, avatar, birthday, mail];
  const token = getToken({ name, mail });
  const template = getTemplate(name, token);

  //Crea un usuario al registrase
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

const verifyEmail = (token) => {
  const tokenGotten = getTokenData(token);

  try {
    //Revisa si el token ya expiró
    if (!tokenGotten.data)
      throw new Error("Hubo un error. Envía un nuevo correo de verificación");
    const { mail } = tokenGotten.data;
    return userPool
      .getUserByEmail(mail)
      .then((response) => {
        const [[user]] = response;
        //Revisa si el correo ha sido verificado anteriormente
        if (user.email_verified)
          throw new Error("El correo ya ha sido verificado anteriormente");

        return userPool.verifyEmail(mail);
      })
      .then(() => {
        return { status: 200, msg: "Correo verificado" };
      })
      .catch((error) => {
        return { status: 200, msg: error.message };
      });
  } catch (error) {
    return { status: 200, msg: error.message };
  }
};

const authUser = (body) => {
  const { mail, password } = body;
  let data = null;

  if (mail && password) {
    return userPool
      .getUserByEmail(mail)
      .then((user) => {
        [[data]] = user;
        if (data && data.email_verified === 0)
          throw new Error("El correo no ha sido verificado");

        const correctPass =
          data === undefined
            ? false
            : bcrypt.compareSync(password, data.password);
        if (!correctPass) throw new Error("Usuario o password incorrecto");
        return { status: 200, msg: "Bienvenido", data };
      })
      .catch((error) => {
        return { status: 400, msg: error.message };
      });
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
