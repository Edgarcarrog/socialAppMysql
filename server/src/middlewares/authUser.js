const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Pasé por authUser y el token es:", token);
  next();
  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  /*
  try {
      const cifrado = jwt.verify(token, process.env.SECRETA);
      req.usuario = cifrado.usuario;
      next();
  } catch (error) {
    res.status(401).json({ msg: "Token no válido"});
  } */
};
