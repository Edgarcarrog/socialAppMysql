const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET,
    { expiresIn: "1d" }
  );
};

const getTokenData = (token) => {
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    return cifrado;
  } catch (error) {
    throw new Error("Token inválido");
  }
};

module.exports = {
  getToken,
  getTokenData,
};
