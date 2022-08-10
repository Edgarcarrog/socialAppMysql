const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  return jwt.sign(
    {
      payload,
    },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
};

const verifyToken = (token) => {
  try {
    const cifrado = jwt.verify(token, process.env.SECRET);
    return cifrado;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
