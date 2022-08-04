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
  const cifrado = jwt.verify(token, process.env.SECRET);
  return cifrado;
};

module.exports = {
  getToken,
  getTokenData,
};
