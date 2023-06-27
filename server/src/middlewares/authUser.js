const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    jwt.verify(token, process.env.SECRET);
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Token no válido" });
  }
};
