const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
};

const getTokenData = (token) => {
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    return cifrado;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getToken,
  getTokenData,
};
