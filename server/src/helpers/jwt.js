const jwt = require("jsonwebtoken");

//genera un token con la data enviada
const generateToken = (payload) => {
  return jwt.sign(
    {
      payload,
    },
    process.env.SECRET,
    { expiresIn: "30d" }
  );
};

//verifica que el token sea válido
const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    return decodedToken.payload.id;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
