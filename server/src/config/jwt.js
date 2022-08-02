const jwt = require("jsonwebtoken");

const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.SECRET || "secret",
    { expiresIn: "1d" }
  );
};

const getTokenData = (token) => {
  try {
    const cifrado = jwt.verify(token, process.env.SECRET || "secret");
    return cifrado;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getToken,
  getTokenData,
};
