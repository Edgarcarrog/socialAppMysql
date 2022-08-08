const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET,
    { expiresIn: "5m" }
  );
};

const getTokenData = (token) => {
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    console.log(cifrado);
    return cifrado;
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ msg: "Permiso no válido" });
  }
};

module.exports = {
  getToken,
  getTokenData,
};
