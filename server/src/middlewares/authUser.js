const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log("Pasé por authUser y el token es:", token);

    if (!token) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    const cifrado = jwt.verify(token, process.env.SECRET);
    console.log("Token cifrado: ", cifrado);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Token no válido" });
  }
};
