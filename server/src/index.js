require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const promisePool = require("./database/pool");
const userRoutes = require("./v1/routes/users.routes");
const hobbieRoutes = require("./v1/routes/hobbies.routes");
const { urlencoded } = require("express");

//settings
app.set("port", process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

//routers
app.use("/api/v1", userRoutes);
app.use("/api/v1", hobbieRoutes);

/* promisePool.query("DROP TABLE IF EXISTS hobbies");
promisePool.query("DROP TABLE IF EXISTS users"); */

promisePool.query(
  "CREATE TABLE IF NOT EXISTS users (userId VARCHAR(255) PRIMARY KEY, name VARCHAR(30) DEFAULT NULL, mail VARCHAR(50) DEFAULT NULL, password VARCHAR(255) DEFAULT NULL, avatar VARCHAR(30) DEFAULT NULL, birthday DATE DEFAULT NULL, email_verified BOOLEAN NOT NULL)"
);

promisePool.query(
  "CREATE TABLE IF NOT EXISTS hobbies (hobbieId INTEGER PRIMARY KEY AUTO_INCREMENT, hobbie INTEGER DEFAULT NULL, userId VARCHAR(255), FOREIGN KEY (userId) REFERENCES users (userId))"
);

app.listen(app.get("port"), console.log(`Server on port ${app.get("port")}`));
